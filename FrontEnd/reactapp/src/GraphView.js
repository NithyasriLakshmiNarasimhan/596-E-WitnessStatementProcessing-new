// // // // import React, { useState } from 'react';
// // // // import './Statements.css';
// // // // import { usePromiseTracker } from "react-promise-tracker";
// // // // import { TailSpin } from "react-loader-spinner";
// // // // // import CaseList from './CaseList'
// // // // import Box from '@mui/material/Box';
// // // // import List from '@mui/material/List';
// // // // import ListItemButton from '@mui/material/ListItemButton';
// // // // import ListItemIcon from '@mui/material/ListItemIcon';
// // // // import ListItemText from '@mui/material/ListItemText';
// // // // import FolderIcon from '@mui/icons-material/Folder';
// // // // import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
// // // // import axios from "axios";

// // // // import { trackPromise } from 'react-promise-tracker';

// // // // const LoadingIndicator = props => {
        
// // // //     const { promiseInProgress } = usePromiseTracker();
// // // //     return (
// // // //         promiseInProgress &&
// // // //         <div>
// // // //             <TailSpin color="green" radius={"2px"} />
// // // //         </div >
// // // //     );
// // // // }



// // // // function DynamicQA() {
// // // //     const [text, setText] = useState('');
// // // //     const [question, setQuestion] = useState('');
// // // //     const [response, setResponse] = useState('');

// // // //     const handleSubmit = () => {
// // // //         trackPromise(
// // // //             axios({
// // // //                 method: "POST",
// // // //                 url: "/process_text",
// // // //                 data: {
// // // //                     text: text,
// // // //                     question: question
// // // //                 }
// // // //             })
// // // //             .then((response) => {
// // // //                 const res = response.data
// // // //                 setResponse("response:\n" + res);
// // // //             }).catch((error) => {
// // // //                 if (error.response) {
// // // //                     console.log(error.response)
// // // //                     console.log(error.response.status)
// // // //                     console.log(error.response.headers)
// // // //                 }
// // // //             })
// // // //         );
// // // //     };

// // // //     return (
// // // //         <div className="DynamicQA">
// // // //             <header className="App-header">
// // // //                 <div>
// // // //                 <label htmlFor="userTextInput">Enter Case Number    </label>
// // // //                     <input 
// // // //                         type="text" 
// // // //                         value={text} 
// // // //                         onChange={(e) => setText(e.target.value)} 
// // // //                     />
// // // //                     <br />
// // // //                 <label htmlFor="userTextInput">Enter your Question    </label>
// // // //                     <input 
// // // //                         type="question" 
// // // //                         value={question} 
// // // //                         onChange={(e) => setQuestion(e.target.value)} 
// // // //                     />

// // // // <br />
// // // //                     <button onClick={handleSubmit}>Submit</button>
// // // //                     <p>{response}</p>
// // // //                 </div>
// // // //             </header>
// // // //         </div>
// // // //     );
// // // // }

// // // // export default DynamicQA;




// // // import React, { useState } from 'react';
// // // import axios from "axios";
// // // import { trackPromise } from 'react-promise-tracker';
// // // import { usePromiseTracker } from "react-promise-tracker";
// // // import { TailSpin } from "react-loader-spinner";
// // // import './Statements.css';
// // // import Box from '@mui/material/Box';
// // // import List from '@mui/material/List';
// // // import ListItemButton from '@mui/material/ListItemButton';
// // // import ListItemIcon from '@mui/material/ListItemIcon';
// // // import ListItemText from '@mui/material/ListItemText';
// // // import FolderIcon from '@mui/icons-material/Folder';
// // // import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

// // // const LoadingIndicator = () => {
// // //     const { promiseInProgress } = usePromiseTracker();
// // //     return promiseInProgress && (
// // //         <div className="loader">
// // //             <TailSpin color="green" radius={"2px"} />
// // //         </div>
// // //     );
// // // };

// // // const DynamicQA = () => {
// // //     const [text, setText] = useState('');
// // //     const [question, setQuestion] = useState('');
// // //     const [response, setResponse] = useState('');

// // //     const handleSubmit = async () => {
// // //         try {
// // //             const response = await trackPromise(axios.post("/process_text", { text, question }));
// // //             setResponse(`response:\n${response.data}`);
// // //         } catch (error) {
// // //             // Handle errors here
// // //             console.error('An error occurred:', error);
// // //         }
// // //     };

// // //     return (
// // //         <div className="DynamicQA">
// // //             <header className="App-header">
// // //                 <div>
// // //                     <label htmlFor="userTextInput">Enter Case Number</label>
// // //                     <input 
// // //                         type="text" 
// // //                         value={text} 
// // //                         onChange={(e) => setText(e.target.value)}
// // //                     />
// // //                     <br />
// // //                     <label htmlFor="userQuestionInput">Enter your Question</label>
// // //                     <input 
// // //                         type="text" 
// // //                         value={question} 
// // //                         onChange={(e) => setQuestion(e.target.value)}
// // //                     />
// // //                     <br />
// // //                     <button onClick={handleSubmit}>Submit</button>
// // //                     <p>{response}</p>
// // //                 </div>
// // //             </header>
// // //         </div>
// // //     );
// // // };

// // // export default DynamicQA;



// // import React, { useState } from 'react';
// // import './Statements.css';
// // import { usePromiseTracker } from "react-promise-tracker";
// // import { TailSpin } from "react-loader-spinner";
// // import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

// // import axios from "axios";
// // import { trackPromise } from 'react-promise-tracker';

// // const LoadingIndicator = () => {    
// //     const { promiseInProgress } = usePromiseTracker();
// //     return (
// //         promiseInProgress && <CircularProgress color="primary" />
// //     );
// // }

// // function GraphView() {
// //     const [text, setText] = useState('');
// //     // const [question, setQuestion] = useState('');
// //     const [response, setResponse] = useState('');

// //     const handleSubmit = () => {
// //         trackPromise(
// //             axios.post("/StaticGraph", { text})
// //                 .then((response) => setResponse("response:\n" + response.data))
// //                 .catch((error) => console.error('Error:', error))
// //         );
// //     };

// //     return (
// //         <Box className="DynamicQA" sx={{ padding: 3 }}>
// //             <Typography variant="h4" gutterBottom>
// //                 Dynamic Q&A
// //             </Typography>
// //             <TextField 
// //                 label="Enter Case Number" 
// //                 variant="outlined" 
// //                 value={text} 
// //                 onChange={(e) => setText(e.target.value)} 
// //                 fullWidth 
// //                 margin="normal"
// //             />
// //             {/* <TextField 
// //                 label="Enter your Question" 
// //                 variant="outlined" 
// //                 value={question} 
// //                 onChange={(e) => setQuestion(e.target.value)} 
// //                 fullWidth 
// //                 margin="normal"
// //             /> */}
// //             <Button variant="contained" color="primary" onClick={handleSubmit}>
// //                 Submit
// //             </Button>
// //             <Typography variant="body1" sx={{ marginTop: 2 }}>
// //                 {response}
// //             </Typography>
// //             <LoadingIndicator />
// //         </Box>
// //     );
// // }

// // export default GraphView;


// import React, { useState } from 'react';
// import './Statements.css';
// import { usePromiseTracker } from "react-promise-tracker";
// import { CircularProgress } from '@mui/material';
// import { Box, TextField, Button, Typography, Card, CardMedia } from '@mui/material';
// import axios from "axios";
// import { trackPromise } from 'react-promise-tracker';

// const LoadingIndicator = () => {    
//     const { promiseInProgress } = usePromiseTracker();
//     return promiseInProgress && <CircularProgress color="primary" />;
// }

// function GraphView() {
//     const [text, setText] = useState('');
//     const [response, setResponse] = useState('');
//     const [imageSrc, setImageSrc] = useState('');

//     const handleSubmit = () => {
//         trackPromise(
//             axios.post("/StaticGraph", { text }, { responseType: 'blob' })
//                 .then((response) => {
//                     const imageBlob = response.data;
//                     const imageUrl = URL.createObjectURL(imageBlob);
//                     setImageSrc(imageUrl); // Set the image URL for rendering
//                 })
//                 .catch((error) => console.error('Error:', error))
//         );
//     };

//     return (
//         <Box className="DynamicQA" sx={{ padding: 3 }}>
//             <Typography variant="h4" gutterBottom>
//                 Graph View of Statements
//             </Typography>
//             <TextField 
//                 label="Enter Case Number" 
//                 variant="outlined" 
//                 value={text} 
//                 onChange={(e) => setText(e.target.value)} 
//                 fullWidth 
//                 margin="normal"
//             />
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//                 Submit
//             </Button>
//             {imageSrc && (
//                 <Card sx={{ maxWidth: 345, marginTop: 2 }}>
//                     <CardMedia
//                         component="img"
//                         height="194"
//                         image={imageSrc}
//                         alt="Graphical response"
//                     />
//                 </Card>
//             )}
//             <LoadingIndicator />
//         </Box>
//     );
// }

// export default GraphView;



import React, { useState, useEffect } from 'react';
import './Statements.css';
import { usePromiseTracker } from "react-promise-tracker";
import { Box, TextField, Button, Typography, Card, CardMedia } from '@mui/material';
import axios from "axios";
import { trackPromise } from 'react-promise-tracker';
import { TailSpin } from "react-loader-spinner";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import SearchIcon from '@mui/icons-material/Search';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ListItem from '@mui/material/ListItem';






function GraphView() {
    // const [text, setText] = useState('');
    const [imageSrc, setImageSrc] = useState('');
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
            axios.post("/StaticGraph", { currCaseName }, { responseType: 'blob' })
                .then((response) => {
                    const imageBlob = response.data;
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setImageSrc(imageUrl); // Set the image URL for rendering
                })
                .catch((error) => console.error('Error:', error))
        );
    };
    const handleText = (e) => {
        setCurrCase(e.target.value);
    }
    const checkEnter = (e) => {
        if (e.key === 'Enter') {
            setCurrCaseName(currCase);
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
        <Box className="DynamicQA" sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom style ={{position: 'absolute', top: '15%', left: '20%'}}>
                Graph View of the Statements
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
                    variant="contained" onClick={handleSubmit}><SearchIcon fontSize='large'></SearchIcon> Generate Graph</Button>
            {imageSrc && (
                <Card sx={{ maxWidth: '100%', marginLeft: 25, marginTop: 12 }}>
                    <CardMedia
                        component="img"
                        image={imageSrc}
                        alt="Graphical response"
                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </Card>
            )}
                <div className='center'>
                    <LoadingIndicator />
                </div>
        </Box>
        </header>
    );
}

export default GraphView;
