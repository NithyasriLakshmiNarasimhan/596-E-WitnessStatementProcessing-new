import './Statements.css';
import { useRef } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import DescriptionIcon from '@mui/icons-material/Description';
import { useState, useEffect } from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';
import { TailSpin } from "react-loader-spinner";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import {Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function Analyze() {
    const hiddenFileInput = useRef(null);
    const [QandAResponse, setQandAResponse] = useState('');
    const [NERResponse, setNERResponse] = useState('');
    const [statement, setStatement] = useState('');
    const [newQs, setNewQs] = useState('');
    const [newQList, setnewQList] = useState([]);
    const [newQ, setNewQ] = useState('');
    const [currStatement, setCurrStatement] = useState('');
    const [fileName, setFileName] = useState('');
    const [currCaseName, setCurrCaseName] = useState('');
    const [savedMessage, setSavedMessage] = useState('');
    const [showCaseName, setShowCaseName] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const [currCase, setCurrCase] = useState('');
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
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const LoadingIndicator = props => {
        const { promiseInProgress } = usePromiseTracker();
        return (
            promiseInProgress &&
            <div>
                <TailSpin color="green" radius={"2px"} />
            </div >
        );
    }

    const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log(text);
            setCurrStatement(text);
        };
        reader.readAsText(e.target.files[0]);
        setFileName(e.target.files[0].name)
    }
    const checkEnter = (e) => {
        if (e.key === 'Enter') {
            setShowCaseName("Case Name: " + currCaseName);
        }
    }
    const handleText = (e) => {
        setCurrCaseName(e.target.value);
    }
    function sendData() {
        // sendQandA();
        sendNER();
        UploadStatement();
        setShowCaseName("Case Name: " + currCaseName);

    }

    function UploadStatement() {
        trackPromise(
            axios({
                method: "POST",
                url: "/UploadStatement",
                data: {
                    statement: currStatement,
                    caseName: currCaseName,
                    fileName: fileName
                }
            })
                .then((response) => {
                    const res = response.data
                    // setNERResponse(res);
                    setSavedMessage("Saved Analysis to: " + currCaseName);
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                }));
    }
    function sendNER() {
        trackPromise(
            axios({
                method: "POST",
                url: "/NER",
                data: {
                    statement: currStatement,
                    caseName: currCaseName,
                    fileName: fileName
                }
            })
                .then((response) => {
                    const res = response.data
                    setNERResponse(res);
                    setSavedMessage("Saved Analysis to: " + currCaseName);
                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                }));
    }

    const handleListItemClick = (event, index) => {
        setCurrCaseName(index);
        setShowCaseName(index);
    }
    function sendQandA() {
        trackPromise(
            axios({
                method: "POST",
                url: "/QandA",
                data: {
                    questions: newQList,
                    statement: currStatement
                }
            })
                .then((response) => {
                    const res = response.data
                    setQandAResponse("Questions and answers:\n" + res);
                    setStatement("Witness Statement:\n" + currStatement);

                }).catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                        console.log(error.response.status)
                        console.log(error.response.headers)
                    }
                }));
    }

    return (

        <div className="Analyze">
            <Button style={{
                borderRadius: 35,
                backgroundColor: "#21b6ae",
                padding: "10px 12px",
                fontSize: "16px",
                width: "20%",
                position: "absolute",
                left: "40%",
                top: "37%"
            }}
                variant="contained" onClick={handleClick}><DescriptionIcon fontSize='large'></DescriptionIcon> Upload New Statement</Button>

            <TextField style={{
                backgroundColor: "#21b6ae",
                fontSize: "16px",
                width: "20%",
                position: "absolute",
                left: "40%",
                top: "25%",
                color: "white"
            }} label="Case Name:" value={currCaseName} variant="filled" focused onChange={(e) => handleText(e)} onKeyDown={checkEnter} />
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
                variant="contained" onClick={sendData}><SearchIcon fontSize='large'></SearchIcon> Analyze Statement</Button>
            <header className="App-header">
                <Typography variant="h4" gutterBottom style={{ position: 'absolute', top: '15%', left: '20%' }}>
                    Analyze New Statement
                </Typography>
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
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                    <div style={{ position: 'relative', left: '20%', right: '10%', width: '70%' }}>
                        {fileName}<br></br>
                        {showCaseName}<br></br>
                        {savedMessage}
                        <br></br>
                        <br></br>
                        {NERResponse}
                        <br></br>
                        <br></br>
                        {statement}
                    </div>
                </p>
                <div className='center'>
                    <LoadingIndicator />
                </div>
                {/* <p style={{ position: 'absolute', left: '5%' }}>
                    {fileName}<br></br>
                    {showCaseName}<br></br>
                    {savedMessage}
                    <br></br>
                    <br></br>
                    {NERResponse}
                    <br></br>
                    <br></br>
                    {statement}
                </p> */}

                <input
                    type="file"
                    onChange={(e) => showFile(e)}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
            </header>
        </div>
    );
}

export default Analyze;
