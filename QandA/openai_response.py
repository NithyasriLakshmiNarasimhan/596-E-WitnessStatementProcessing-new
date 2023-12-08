import openai
from openai import OpenAI


def get_openai_response(user_prompt, system_prompt):
    client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    
    api_key = "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"
)

    response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": system_prompt
        },
              
        {
            "role": "user",
            "content": user_prompt
        }
    ],
    model="gpt-3.5-turbo",
)
    # compute_usage(response)
    # print(response)
    return (response.choices[0].message.content)
