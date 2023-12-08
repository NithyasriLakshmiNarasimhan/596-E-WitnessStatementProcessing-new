import './App.css';
import DescriptionIcon from '@mui/icons-material/Description';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HubIcon from '@mui/icons-material/Hub';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
function Home() {
    return (
        <div>
            <header className="App-header">

                <div className='instructionsTitle'>
                    <div style={{ fontWeight: 'bold' }}>
                    Analysis of Witness Statements for FBI investigations
                    <br></br>
                    </div>
                </div>
                <div className='instructionsHead'>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                    This tool is designed to assist with witness statement reading and processing. 
                    <br></br>
                    There are several tools available:
                    <br></br><br></br>
                    <div style={{ fontWeight: 'bold' }}>
                        <UploadFileIcon></UploadFileIcon>
                    Upload Statement:
                    </div>
                </div>
                <div className='instructionsBody'>
                    Allows for uploading of new witness statements for analysis.
                </div>
                <br></br>
                <div className='instructionsHead'>
                    <div style={{ fontWeight: 'bold' }}>
                        <HubIcon></HubIcon>
                        Graph View Of Statements:
                    </div>
                </div>
                <div className='instructionsBody'>
                    Provides a graphical view of what information has been collected and what is missing from a case's collected withness statements.
                </div>
                <br></br>
                <div className='instructionsHead'>
                    <div style={{ fontWeight: 'bold' }}>
                        <FindInPageIcon></FindInPageIcon>
                        FAQ's For Statements:
                    </div>
                </div>
                <div className='instructionsBody'>
                    Provides answers to common questions asked about in a case of the given crime. 
                </div>
                <br></br>
                <div className='instructionsHead'>
                    <div style={{ fontWeight: 'bold' }}>
                        <QuestionAnswerIcon></QuestionAnswerIcon>
                        Interactive Q and A:
                    </div>
                </div>
                <div className='instructionsBody'>
                    Allows for asking questions about a case where answers will be derived from searching through all witness statements for the given case.
                </div>
                <br></br>
                <div className='instructionsHead'>
                    <div style={{ fontWeight: 'bold' }}>
                        <DescriptionIcon></DescriptionIcon>
                        Case Files:
                    </div>
                </div>
                <div className='instructionsBody'>
                    Allows for navigating between cases and viewing that case's witness statements, as well as viewing of the Named Entity Recognition analysis on each statement.
                </div>
                <br></br><br></br><br></br>
            </header>

        </div>
    );
}
export default Home;