// // import React, { useState } from 'react';
// // import './Statements.css';
// // import { usePromiseTracker } from "react-promise-tracker";
// // import { TailSpin } from "react-loader-spinner";
// // // import CaseList from './CaseList'
// // import Box from '@mui/material/Box';
// // import List from '@mui/material/List';
// // import ListItemButton from '@mui/material/ListItemButton';
// // import ListItemIcon from '@mui/material/ListItemIcon';
// // import ListItemText from '@mui/material/ListItemText';
// // import FolderIcon from '@mui/icons-material/Folder';
// // import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
// // import axios from "axios";

// // import { trackPromise } from 'react-promise-tracker';

// // const LoadingIndicator = props => {
        
// //     const { promiseInProgress } = usePromiseTracker();
// //     return (
// //         promiseInProgress &&
// //         <div>
// //             <TailSpin color="green" radius={"2px"} />
// //         </div >
// //     );
// // }



// // function DynamicQA() {
// //     const [text, setText] = useState('');
// //     const [question, setQuestion] = useState('');
// //     const [response, setResponse] = useState('');

// //     const handleSubmit = () => {
// //         trackPromise(
// //             axios({
// //                 method: "POST",
// //                 url: "/process_text",
// //                 data: {
// //                     text: text,
// //                     question: question
// //                 }
// //             })
// //             .then((response) => {
// //                 const res = response.data
// //                 setResponse("response:\n" + res);
// //             }).catch((error) => {
// //                 if (error.response) {
// //                     console.log(error.response)
// //                     console.log(error.response.status)
// //                     console.log(error.response.headers)
// //                 }
// //             })
// //         );
// //     };

// //     return (
// //         <div className="DynamicQA">
// //             <header className="App-header">
// //                 <div>
// //                 <label htmlFor="userTextInput">Enter Case Number    </label>
// //                     <input 
// //                         type="text" 
// //                         value={text} 
// //                         onChange={(e) => setText(e.target.value)} 
// //                     />
// //                     <br />
// //                 <label htmlFor="userTextInput">Enter your Question    </label>
// //                     <input 
// //                         type="question" 
// //                         value={question} 
// //                         onChange={(e) => setQuestion(e.target.value)} 
// //                     />

// // <br />
// //                     <button onClick={handleSubmit}>Submit</button>
// //                     <p>{response}</p>
// //                 </div>
// //             </header>
// //         </div>
// //     );
// // }

// // export default DynamicQA;




// import React, { useState } from 'react';
// import axios from "axios";
// import { trackPromise } from 'react-promise-tracker';
// import { usePromiseTracker } from "react-promise-tracker";
// import { TailSpin } from "react-loader-spinner";
// import './Statements.css';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import FolderIcon from '@mui/icons-material/Folder';
// import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

// const LoadingIndicator = () => {
//     const { promiseInProgress } = usePromiseTracker();
//     return promiseInProgress && (
//         <div className="loader">
//             <TailSpin color="green" radius={"2px"} />
//         </div>
//     );
// };

// const DynamicQA = () => {
//     const [text, setText] = useState('');
//     const [question, setQuestion] = useState('');
//     const [response, setResponse] = useState('');

//     const handleSubmit = async () => {
//         try {
//             const response = await trackPromise(axios.post("/process_text", { text, question }));
//             setResponse(`response:\n${response.data}`);
//         } catch (error) {
//             // Handle errors here
//             console.error('An error occurred:', error);
//         }
//     };

//     return (
//         <div className="DynamicQA">
//             <header className="App-header">
//                 <div>
//                     <label htmlFor="userTextInput">Enter Case Number</label>
//                     <input 
//                         type="text" 
//                         value={text} 
//                         onChange={(e) => setText(e.target.value)}
//                     />
//                     <br />
//                     <label htmlFor="userQuestionInput">Enter your Question</label>
//                     <input 
//                         type="text" 
//                         value={question} 
//                         onChange={(e) => setQuestion(e.target.value)}
//                     />
//                     <br />
//                     <button onClick={handleSubmit}>Submit</button>
//                     <p>{response}</p>
//                 </div>
//             </header>
//         </div>
//     );
// };

// export default DynamicQA;



import React, { useState, useEffect } from 'react';
import './Statements.css';
import { usePromiseTracker } from "react-promise-tracker";
import { TailSpin } from "react-loader-spinner";
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import ListItem from '@mui/material/ListItem';

import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';


function InteractiveQA() {
    const [text, setText] = useState('');
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [currCaseName, setCurrCaseName] = useState('');
    const [currCase, setCurrCase] = useState('');
    const [fileNames, setFileNames] = useState([]);
    const [viewQuestion, setViewQuestion] = useState('');
    
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
        setViewQuestion(question);
        trackPromise(
            axios.post("/process_text", { currCaseName, question })
                .then((response) => setText("response:\n" + response.data))
                .catch((error) => console.error('Error:', error))
        );
    };
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
                    {viewQuestion}<br></br><br></br>
                    {text}
                </div>
            </p>
        <Box className="InteractiveQA" sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom style={{ position: 'absolute', top: '15%', left: '20%' }}>
                Interactive Q&A
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
                }} label="Enter your Question" value={question} variant="filled" focused onChange={(e) => setQuestion(e.target.value)} />

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
        </Box>
            <div className='center'>
                <LoadingIndicator />
            </div> 

        </header>
    );
}

export default InteractiveQA;

