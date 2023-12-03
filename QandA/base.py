from transformers  import  AutoTokenizer, AutoModelWithLMHead
from transformers import AutoModelForTokenClassification
from transformers import pipeline
import json
import os
# model_name = "MaRiOrOsSi/t5-base-finetuned-question-answering"
# tokenizer = AutoTokenizer.from_pretrained(model_name)
# model = AutoModelWithLMHead.from_pretrained(model_name)
from flask import Flask
from flask import request
import spacy
api = Flask(__name__)
import tensorflow as tf
import json
import openai
from openai import OpenAI
import json
from graphviz import Digraph
from PIL import Image
from io import BytesIO
import ast
from treelib import Node, Tree
from graphviz import Graph, Digraph
from flask import Flask, request
from flask import Flask, send_file
from PIL import Image
from io import BytesIO
import matplotlib.pyplot as plt
import networkx as nx
import mongo
from openai_response import get_openai_response

from dynamicQA import get_answers_dynamic
from staticgraph import get_static_answers




@api.route('/getFiles', methods = ['GET', 'POST', 'DELETE'])
def getCaseFiles():
  statements = json.loads(request.data.decode())
  context = statements['fileNum']
  statementsPath = "./Statements"
  fileString = ""
  for fileName in os.listdir(statementsPath):
    fileString += fileName + '\n'
  return os.listdir(statementsPath)

def openAI_QA(context, question):
  system_prompt = """
I will be giving you a few witness statements about a crime. Your task is to answer the follow up question in a clear and concise manner. The accuracy of this task is important and so, refrain from answering the questions whose answers are not mentioned in the statement.
"""
  user_prompt = "The Witness statements are as follows:\n" + context + "\n\n" + "question: \t" + question

  return get_openai_response(user_prompt, system_prompt)


@api.route('/UploadStatement', methods=['POST'])
def UploadStatement():
  statement = request.json.get('statement')
  caseName = request.json.get('caseName')
  #  fileName = request.json.get('fileName')
  return mongo.store_in_db(statement,caseName)


@api.route('/process_text', methods=['POST'])
def process_text():

    dir_name = request.json.get('text')
    question = request.json.get('question')
    dict = mongo.show_mongodb_statements(dir_name)
    statements = ""

    for key in dict.keys():
       statements+=dict[key]   
       statements+='\n'
    return openAI_QA(statements, question)
 

@api.route('/getFileContent', methods = ['GET', 'POST', 'DELETE'])
def getFileContent():
  statements = json.loads(request.data.decode())
  fileNum = statements['fileNum']
  filePath = "./Statements/" + fileNum
  returnList = [[], ""]
  if(os.path.isdir(filePath)):
    returnList[0] = os.listdir(filePath)
  if(os.path.isfile(filePath)):
    fileString = os.path.basename(filePath) + '\n' + '\n'
    file=open(filePath,"r")
    fileString += file.read()
    returnList[1] = fileString
  return returnList


@api.route('/DynamicQA', methods = ['GET', 'POST', 'DELETE'])
def get_dynamic_answers():
    case = request.json.get('text')
    crime = request.json.get('crime')
    return get_answers_dynamic(case, crime)


@api.route('/StaticGraph', methods = ['GET', 'POST', 'DELETE'])
def get_answers():
    case = request.json.get('text')

    graph_bytes = get_static_answers(case)
    graph_bytesio = BytesIO(graph_bytes)
    image = Image.open(graph_bytesio)
    img_stream = BytesIO()
    image.save(img_stream, format='PNG')
    img_stream.seek(0)

    # Serve the image to the front end
    return send_file(img_stream, mimetype='image/png')

  


@api.route('/NER', methods = ['GET', 'POST', 'DELETE'])
def doNer():
  statements = json.loads(request.data.decode())
  statement = statements['statement']
  # import usaddress

  tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
  model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")
  tokenizer_address = AutoTokenizer.from_pretrained("ctrlbuzz/bert-addresses")
  model_address = AutoModelForTokenClassification.from_pretrained("ctrlbuzz/bert-addresses")
  # spacy.cli.download("en_core_web_sm")
  NER = spacy.load("en_core_web_sm")
  def apt_no(trial_token, ner):
    apt=''
    iter=1
    while iter<=5:
      if trial_token[ner['index']-iter].isdigit():
        apt = trial_token[ner['index']-iter] + apt
      #   print(trial_token[ner['index']-iter])
      elif trial_token[ner['index']-iter][2:].isdigit():
        apt = trial_token[ner['index']-iter][2:] + apt
      #   print(trial_token[ner['index']-iter][2:])
      else:
        if apt=='':
          return ner['word']
        else:
          return apt + ' ' + ner['word']
      iter+=1
  #   print(type(apt))
  nlp = pipeline("ner", model=model, tokenizer=tokenizer)
  nlp_address = (pipeline("ner", model=model_address, tokenizer=tokenizer_address))

  def NER_func(doc):

    ner_res = nlp(doc)
  #   for ner in ner_res:
  #     print('entity = ', ner['entity'], " word = ",ner['word'])
    inputs = tokenizer(doc, return_tensors="pt")
    # print(inputs["input_ids"][0])
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    # print(tokens)
    trial_token = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    for ner in ner_res:
      if ner['entity'] == 'B-LOC':
        ner['word'] = apt_no(trial_token, ner)
      #   print(ner['word'])
      #   if trial_token[ner['index']-1].isdigit():
      #     ner['word'] = trial_token[ner['index']-1] + ' ' + ner['word']
      #   if trial_token[ner['index']-1].startswith('##'):
      #     if trial_token[ner['index']-1][2:].isdigit():
      #       # # h_no = find_house_no(1,trial_token[ner['index']-5],'')
      #       ner['word'] = trial_token[ner['index']-2] + trial_token[ner['index']-1][2:] + ' ' + ner['word']
    per=[]
    loc=[]
    misc=[]
    idk=[]
    for ner in ner_res:
      # print('entity = ', ner['entity'], " word = ",ner['word'])
      if ner['entity'] =='B-PER' or ner['entity'] == 'I-PER':
        per.append([ner['word'], ner['entity']])
      elif ner['entity'] =='B-LOC' or ner['entity'] == 'I-LOC':
        loc.append([ner['word'], ner['entity']])
      elif ner['entity'] =='B-MISC' or ner['entity'] == 'I-MISC':
        misc.append([ner['word'], ner['entity']])
      else:
        idk.append([ner['word'], ner['entity']])
      
  
    entity_arr = [per]+[loc]+[misc]+[idk]
    # print(entity_arr)

    flag=0
    begin_flag=0
    temp=''
    per_final=[]
    entity_final=[]
    for ent in entity_arr:
      # print(ent)
      ent_len=len(ent)
      temp=''
      per_final=[]
      for i,val in enumerate(ent):
        if val[1].startswith('B'):
          begin_flag=1
          per_final.append(temp)
          temp=val[0]
        else:
          begin_flag=0
          if val[0].startswith('##'):
            temp=temp+val[0][2:]
          elif not val[0][0].isalpha():
            temp=temp+val[0]
            flag=1
          else:
            if flag==1:
              flag=0
              temp=temp+val[0]
            else:
              temp=temp+' '+val[0]
          if i==ent_len-1:
            per_final.append(temp)
      if begin_flag==1:
        per_final.append(temp)

      entity_final.append(per_final[1:]) 
    entity_dict = {'Names': entity_final[0], 'Improper addresses and Locations': entity_final[1], 'Vehicles': entity_final[2] , 'Organizations': entity_final[3]}
    # for key,val in entity_dict.items():
    #   print(key,' : ', val)
    var_date = {(ent.text.strip(), ent.label_) for ent in NER(doc).ents if ent.label_ == 'DATE'}
    # print(var_date)
    date_dict = {}
    for text, label in var_date:
        if label not in date_dict:
            date_dict[label] = []
        if not text.isdigit():
          date_dict[label].append(text)
    # print(date_dict)
    entity_dict.update(date_dict)
    return entity_dict
  d = NER_func(statement)
  output = ""
  for k,v in d.items():
    output += k +": "
    v = set(v)
    for name in v:
      output += name + ", "
    output += "\n"
  return output
