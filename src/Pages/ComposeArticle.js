import { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '../userContext';
import { Container, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ComposeArticle() {
  const { user } = useContext(UserContext);
  const [characters, setCharacters] = useState([]);
  const [department, setDepartment] = useState('general');
  const [beneficiary, setBenificiary] = useState([]);
  const [title, setTitle] = useState('');
  const [editableContent, setEditableContent] = useState('');
  const [fontSize, setFontSize] = useState('6'); // Default to 16px
  const [alignment, setAlignment] = useState('Center'); // Default alignment
  const editorRef = useRef(null);
  const fontSizeRef = useRef(null);
  const colorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);

  

  useEffect(() => {
    // Set the default font size and alignment on mount
    handleFontSizeChange();
    handleColorChange();
    handleAlign(alignment);
      
    setEditableContent(editorRef.current.innerHTML);

    return () => {

    };

  }, [alignment, fontSizeRef, colorRef, fontSize, editorRef, department, beneficiary]);

  useEffect(()=>{
    editorRef.current.style.fontSize = `${32}px`;
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default behavior of the Tab key
        document.execCommand('insertHTML', false, '&#160;&#160;&#160;&#160;');
      }

      if (event.key === 'b' && (event.metaKey || event.ctrlKey)) {
        // Check for the "Ctrl+B" or "Cmd+B" (bold) shortcut
        setIsBold(!isBold); // Toggle the bold state
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBold]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        event.preventDefault(); // Prevent the default behavior of the Tab key
        document.execCommand('insertHTML', false, '&#160;&#160;&#160;&#160;');
      }

      if (event.key === 'i' && (event.metaKey || event.ctrlKey)) {
        // Check for the "Ctrl+I" or "Cmd+I" (italic) shortcut
        setIsItalic(!isItalic); // Toggle the italic state
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isItalic]);

  const decodeHtmlEntities = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const placeholderText = {
    title: "Title",
    introduction: "Introduction",
    body: "Body",
    conclusion: "Conclusion"
  };

  const handleContentChange = () => {
    const content = editorRef.current.innerHTML;
    const previousContent = editableContent;
    setEditableContent(content);
if(isPlaceholderVisible){handleAlign('Center')}
    // Hide the placeholder when content is present
    setPlaceholderVisible(content.trim() === '');
    
    // Decode HTML entities (e.g., '&#160;') to get actual characters
    const decodedContent = decodeHtmlEntities(content);
    const decodedPreviousContent = decodeHtmlEntities(previousContent);

    // Find added and removed characters
    const addedCharacters = Array.from(decodedContent).filter((char, index) => char !== decodedPreviousContent[index]);
    const removedCharacters = Array.from(decodedPreviousContent).filter((char, index) => char !== decodedContent[index]);

    // Update characters array
    const updatedCharacters = characters.concat(addedCharacters).filter((char) => !removedCharacters.includes(char));
    setCharacters(updatedCharacters);

  };


  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent the default behavior of the Tab key

      // Insert four spaces for indentation (you can modify this as needed)
      document.execCommand('insertHTML', false, '&#160;&#160;&#160;&#160;');
    }
  };

  const handleFontSizeChange = () => {
    const selectedFontSize = fontSizeRef.current.value || fontSize;
    if (document.queryCommandSupported('fontSize')) {
      document.execCommand('fontSize', false, selectedFontSize);
    }
    setFontSize(selectedFontSize);
  };

  const handleColorChange = () => {
    const selectedColor = colorRef.current.value;
    if (document.queryCommandSupported('foreColor')) {
      document.execCommand('foreColor', false, selectedColor);
    }
  };

  const handleSetBold = () => {
    document.execCommand('bold', false, null);
    setIsBold(!isBold); // Toggle the bold state
  };

  const boldButtonStyle = {
    fontSize: '12.8px',
    backgroundColor: isBold ? '#516473' : '', // Change color when bold is enabled
    fontWeight: isBold ? 'bold' : 'normal', // Add bold font weight when bold is enabled
    borderRadius:'8px'
  };

  const handleSetItalic = () => {
    document.execCommand('italic', false, null);
    setIsItalic(!isItalic)
  };

  const italicButtonStyle = {
    fontSize: '12.8px',
    backgroundColor: isItalic ? '#516473' : '', // Change color when italic is enabled
    fontStyle: isItalic ? 'italic' : 'normal', // Add italic style when italic is enabled
    borderRadius:'8px'
  };

  const handleAlign = (alignmentValue) => {
    document.execCommand(`justify${alignmentValue}`, false, null);
    setAlignment(alignmentValue);
  };

  const handlePost = (dept, benf, titl, cont) => {
    setLoading(true);
    if(title === '' || title.length < 4){
      setLoading(false);
      Swal.fire({
        title: 'Something went wrong :(',
        // icon: 'error',
        text: 'Title is empty or is too short.',
        customClass: {
          confirmButton: 'swal-red-button',
        },
      });
    } else {

      fetch(`${process.env.REACT_APP_API_URL}/api/articles/newArticle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          department: dept,
          beneficiary: benf,
          title: titl,
          content: cont,
          originalPostDate: new Date(),
          latestUpdate: new Date(),
          author: [user.id],
        }),
      }).then((data) => {
        if (data.status === 201) {
          setLoading(false);
          Swal.fire({
            title: 'Article Posted!',
            customClass: {
              title: 'custom-swal-title',
              confirmButton: 'custom-swal-confirm-button',
            },
            didClose: () => {
              // Navigate to "/wiki" here
              window.location.href = '/wiki';
            },
          });
        } else {
          Swal.fire({
            title: 'Something went wrong. :(',
            // icon: 'error',
            text: 'Please try again',
          });
          setLoading(false);
        }
      });
    } 
  };
  

  const handleDepartmentChange = (selectedDepartment) => {
    setDepartment(selectedDepartment);
  };
  
  const beneficiariesOptions = ['general', 'managers', 'newHires', 'executives'];

  const handleBeneficiaryChange = (selectedBeneficiaries) => {
    setBenificiary(selectedBeneficiaries);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const fontstyle = {
    fontSize: '12.8px',
    borderRadius:'5px',
    borderColor:'#383C3F'
  };

  const buttonStyle = {
    fontSize: '12.8px',
    backgroundColor:'#016B83'
  }
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2.5rem' }}>
        <div className="formattingTools" style={{ display: 'flex', justifyContent: 'center', position: 'sticky', top: 40, background: '#F3F3F3', width: '90%', zIndex: 1000, borderRadius: '8px' }}>
          {/* ... (existing formatting tools) */}

          <div style={{ padding: '5px', margin: '2rem' }}>
            <label className='mr-1' htmlFor="fontSize" style={fontstyle}>
              Font Size:{' '}
            </label>
            <select style={fontstyle} id="fontSize" ref={fontSizeRef} onChange={handleFontSizeChange} value={fontSize}>
              <option onClick={handleFontSizeChange} style={fontstyle} value="1">
                10px
              </option>
              <option onClick={handleFontSizeChange} style={fontstyle} value="3">
                16px
              </option>
              <option onClick={handleFontSizeChange} style={fontstyle} value="6">
                32px
              </option>
            </select>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <label className='mr-1' htmlFor="color" style={fontstyle}>
              Text Color:{' '}
            </label>
            <select style={fontstyle} id="color" ref={colorRef} onChange={handleColorChange}>
              <option style={fontstyle} value="#383C3F">
                dark grayish-blue
              </option>
              <option style={fontstyle} value="#F22F41">
                Red
              </option>
              <option style={fontstyle} value="#516473">
                {`Steel Blue (For subtitles)`}
              </option>
            </select>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <button className='mr-1' style={boldButtonStyle} onClick={handleSetBold}>
              Bold
            </button>
            <button style={italicButtonStyle} onClick={handleSetItalic}>
              Italic
            </button>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <button className='mr-1' style={fontstyle} onClick={() => handleAlign('Left')}>
              Left Align
            </button>
            <button  className='mr-1' style={fontstyle} onClick={() => handleAlign('Center')}>
              Center Align
            </button>
            <button style={fontstyle} onClick={() => handleAlign('Right')}>
              Right Align
            </button>
          </div>
        </div>

        <div className="mt-4 container-fluid mb-0" style={{ border: '1px solid #ccc', margin: '2rem', width: '800px'}}>
          
          
          <div 
          contentEditable 
          ref={editorRef} 
          onInput={handleContentChange} 
          onKeyDown={handleKeyDown} // Listen to the keydown event
          style={{ minHeight: '800px', padding: '2rem', margin: '4rem', outline: 'none', zIndex:'-1' }}
          onClick={()=>{if(isPlaceholderVisible){setPlaceholderVisible(false); handleAlign('Center')}}}
          
          />
          <div style={{position:'relative', bottom:'795px', left: '100px', zIndex:'-1'}}>
          {isPlaceholderVisible && (
                <>
                  <div className='fade-in-out-text d-flex' style={{ color: '#aaa', fontStyle: 'italic', position:'relative',zIndex:'-1',top:'50px', left: '150px'}}>
                    <span className=''><i>{`Start writing to remove placeholders . . .`}</i></span>
                  </div>
                  <div className='d-inline-flex' style={{ color: '#aaa', fontStyle: 'italic', position:'relative',zIndex:'-1',top: '-45px', left: '250px' }}>
                    <h4 className='d-inline-flex'>{placeholderText.title}</h4>
                  </div>
                  <div  style={{ color: '#aaa', fontStyle: 'italic', position:'relative',zIndex:'-1',top: '45px', left: '-10px' }}>
                    <h6 className='d-inline-flex'>{placeholderText.introduction}:</h6>
                  </div>
                  <div  style={{ color: '#aaa', fontStyle: 'italic', position:'relative',zIndex:'-1',top: '135px', left: '-10px' }}>
                    <h6 className='d-inline-flex'>{placeholderText.body}:</h6>
                  </div>
                  <div  style={{ color: '#aaa', fontStyle: 'italic', position:'relative',zIndex:'-1',top: '225px', left: '-10px' }}>
                    <h6 className='d-inline-flex'>{placeholderText.conclusion}:</h6>
                  </div>
                </>
            )}
          
          </div>

          
        </div>
        <div>
          <span className='text-muted smallest'><i>Note: this version of article editor/composer is only capable of creating a single page article. The page/canvas will automatically stretch if you need more vertical length for your article.</i>
          </span>
        </div>
        
        <div className='d-flex flex-column align-items-center mt-5' style={{backgroundColor:'#F3F3F3', borderRadius:'10px'}}>

          <div className='p-5 text-center'>
            <h6 className='mb-0'><u>Ready to post your article?</u></h6>
            <span className='text-muted smallest'><i>Kindly fill the necessary information below...</i></span>
          </div>
          
          <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
            <label style={fontstyle} htmlFor="title" className='text-center'><b>Please enter the title of this article you created...</b></label>
            <input
            type="text"
            onChange={(e) => { handleTitleChange(e) }}
            placeholder='Type the title here...'
            style={{fontSize:'12.8px', width:'400px', borderRadius:'5px'}}
            className='p-2'
            />
          </div>
        
          <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
            <label htmlFor="department" style={fontstyle}>
              <b>To which department is this article relevant?</b>
            </label>
            <select style={fontstyle} id="department" onChange={(e) => handleDepartmentChange(e.target.value)} value={department}>
              <option value="general">General</option>
              <option value="executive">Executive</option>
              <option value="legal&finance">Legal & Finance</option>
              <option value="it">IT</option>
              <option value="hr">HR</option>
              <option value="operations">Operations</option>
              <option value="marketing">Marketing</option>
              <option value="shows&touring">Shows & Touring</option>
              <option value="artistdevelopment">Artist Development</option>
            </select>
          </div>

          {/* INSERT BENEFICIARY SELECTIONS HERE */}
          <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
          <label style={fontstyle}><b>To whom is this article intended for?</b></label>
          {beneficiariesOptions.map((option) => (
            <div key={option} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={option}
                checked={beneficiary.includes(option)}
                onChange={() => {
                  const updatedBeneficiaries = beneficiary.includes(option)
                    ? beneficiary.filter((item) => item !== option)
                    : [...beneficiary, option];
                  handleBeneficiaryChange(updatedBeneficiaries);
                }}
              />
              <label  style={fontstyle} className="form-check-label" htmlFor={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            </div>
          ))}
        </div>


        <div className='mt-0' style={{ padding: '5px', margin: '2rem' }}>
          <Button
            style={buttonStyle}
            onClick={() => handlePost(department, beneficiary, title, editableContent)}
            disabled={loading || isPlaceholderVisible || title==='' || beneficiary.length === 0} // Disable the button when loading is true
          >
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </div>

      </div>
      
      </div>
    </Container>
  );
}