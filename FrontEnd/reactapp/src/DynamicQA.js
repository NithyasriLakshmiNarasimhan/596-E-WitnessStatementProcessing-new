
import React, { useState, useEffect } from 'react';
import './Statements.css';
import { usePromiseTracker } from "react-promise-tracker";
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TailSpin } from "react-loader-spinner";
import ListItem from '@mui/material/ListItem';

import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function DynamicQA() {
    const [text, setText] = useState('');
    const [crime, setCrime] = useState('');
    const [responses, setResponses] = useState([]);
    const [currCaseName, setCurrCaseName] = useState('');
    const [currCase, setCurrCase] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (
            promiseInProgress &&
            <div>
                <TailSpin color="green" radius={"2px"} />
            </div >
        );
    }
    useEffect(() => {
        trackPromise(
            axios({
                method: "POST",
                url: "/getCaseNames",
            })
                .then((response) => {
                    const res = response.data
                    // alert(res);
                    setFileNames(res);
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                }));
    }, []);
    const handleSubmit = () => {
        trackPromise(
            axios.post("/DynamicQA", { currCaseName, crime })
                .then((response) => handleResponses(response.data))
                .catch((error) => console.error('Error:', error))
        );
    };
    const handleResponses = (response) => {
        setResponses(response);
        let newText = "";
        response.forEach(function (qa) {
            let newLine = "";
            if (qa.answer === "") {
                newLine = "" + qa.question + ": No Answer.\n";
            }
            else {
                newLine = "" + qa.question + ": " + qa.answer + '\n';
            }
            newText += newLine + '\n';
        });
        setText(newText);
    }
    const handleText = (e) => {
        setCurrCaseName(e.target.value);
    }
    const checkEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrCaseName(currCaseName);
        }
    }
    const handleListItemClick = (event, index) => {
        setCurrCaseName(index);
    }

    return (
        <header className="App-header">
            <Box id='fileList' sx={{ bgcolor: 'primary.list' }} style={{ position: 'absolute', top: '10%' }}>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <ListItemIcon>
                            <ContentPasteSearchIcon style={{ fill: "white" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Open Cases"} />
                    </ListItem>
                    {fileNames.map(e => {


                        return (
                            <ListItemButton
                                onClick={(event) => handleListItemClick(event, e)}
                            >
                                <ListItemIcon>
                                    <FolderIcon style={{ fill: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary={e} />
                            </ListItemButton>);

                    })}
                </List>
            </Box>
            <p>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <div style={{ position: 'relative', left: '20%', right: '10%', width: '70%' }}>
                    {responses.map(qa => {
                        let answer = qa.answer;
                        if (answer === "") {
                            answer = "No Answer Found."
                        }
                        return (
                            <div>
                                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                                    Question: {qa.question}
                                </Typography>
                                <Typography variant="body1">
                                    Answer: {answer}
                                </Typography>
                            </div>

                        )
                    })}
                </div>
            </p>
            <div className='center'>
                <LoadingIndicator />
            </div>
            <Typography variant="h4" gutterBottom style={{ position: 'absolute', top: '15%', left: '20%' }}>
                FAQ's
            </Typography>

            <TextField style={{
                backgroundColor: "#21b6ae",
                fontSize: "16px",
                width: "20%",
                position: "absolute",
                left: "40%",
                top: "25%",
                color: "white"
            }} label="Case Name:" value={currCaseName} variant="filled" focused onChange={(e) => handleText(e)} onKeyDown={checkEnter} />


            <TextField style={{
                backgroundColor: "#21b6ae",
                fontSize: "16px",
                width: "20%",
                position: "absolute",
                left: "40%",
                top: "37%",
                color: "white"
            }} label="What was the crime?" value={crime} variant="filled" focused onChange={(e) => setCrime(e.target.value)} />


            <Button style={{
                borderRadius: 35,
                backgroundColor: "#21b6ae",
                padding: "10px 12px",
                fontSize: "16px",
                width: "20%",
                position: "absolute",
                left: "40%",
                top: "50%"
            }}
                variant="contained" onClick={handleSubmit}><SearchIcon fontSize='large'></SearchIcon> Analyze Case</Button>
        </header>
    );
}

export default DynamicQA;
