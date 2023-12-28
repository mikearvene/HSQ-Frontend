import { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '../userContext';
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ComposeArticle() {
  const { user } = useContext(UserContext);
  const [department, setDepartment] = useState(null);
  const [beneficiary, setBenificiary] = useState([]);
  const [title, setTitle] = useState('');
  const [editableContent, setEditableContent] = useState('');
  const [fontSize, setFontSize] = useState('3'); // Default to 16px
  const [alignment, setAlignment] = useState('Left'); // Default alignment
  const editorRef = useRef(null);
  const fontSizeRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    // Set the default font size and alignment on mount
    handleFontSizeChange();
    handleColorChange();
    handleAlign(alignment);
    setEditableContent(editorRef.current.innerHTML);
    console.log(department);
    console.log(beneficiary);
  }, [alignment, fontSizeRef, colorRef, fontSize, editorRef, department, beneficiary]);

  const handleContentChange = () => {
    const content = editorRef.current.innerHTML;
    setEditableContent(content);
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
  };

  const handleSetItalic = () => {
    document.execCommand('italic', false, null);
  };

  const handleAlign = (alignmentValue) => {
    document.execCommand(`justify${alignmentValue}`, false, null);
    setAlignment(alignmentValue);
  };

  const handlePost = (dept, benf, titl, cont) => {
    

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
        Swal.fire({
          title: 'Article Posted!',
          customClass: {
            title: 'custom-swal-title',
            confirmButton: 'custom-swal-confirm-button',
          },
        });
      } else {
        Swal.fire({
          title: 'Error!!',
          icon: 'error',
          text: 'Please try again',
        });
      }
    });
  };

  const handleDepartmentChange = (selectedDepartment) => {
    setDepartment(selectedDepartment);
  };
  
  const beneficiariesOptions = ['general', 'managers', 'newHires', 'executives'];

  const handleBeneficiaryChange = (selectedBeneficiaries) => {
    setBenificiary(selectedBeneficiaries);
  };

  const fontstyle = {
    fontSize: '12.8px',
  };

  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2.5rem' }}>
        <div className="formattingTools" style={{ display: 'flex', justifyContent: 'center', position: 'sticky', top: 40, background: '#F3F3F3', width: '100%', zIndex: 1000, borderRadius: '8px' }}>
          {/* ... (existing formatting tools) */}

          <div style={{ padding: '5px', margin: '2rem' }}>
            <label htmlFor="fontSize" style={fontstyle}>
              Font Size:{' '}
            </label>
            <select style={fontstyle} id="fontSize" ref={fontSizeRef} onChange={handleFontSizeChange} value={fontSize}>
              <option style={fontstyle} value="2">
                10.24px
              </option>
              <option style={fontstyle} value="3">
                16px
              </option>
              <option style={fontstyle} value="6">
                31.25px
              </option>
            </select>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <label htmlFor="color" style={fontstyle}>
              Text Color:{' '}
            </label>
            <select style={fontstyle} id="color" ref={colorRef} onChange={handleColorChange}>
              <option style={fontstyle} value="#000000">
                Black
              </option>
              <option style={fontstyle} value="#F22F41">
                Red
              </option>
              <option style={fontstyle} value="#516473">
                Steel Blue
              </option>
              <option style={fontstyle} value="#FFD082">
                Orange
              </option>
            </select>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <button style={fontstyle} onClick={handleSetBold}>
              Bold
            </button>
            <button style={fontstyle} onClick={handleSetItalic}>
              Italic
            </button>
          </div>

          <div style={{ padding: '5px', margin: '2rem' }}>
            <button style={fontstyle} onClick={() => handleAlign('Left')}>
              Left Align
            </button>
            <button style={fontstyle} onClick={() => handleAlign('Center')}>
              Center Align
            </button>
            <button style={fontstyle} onClick={() => handleAlign('Right')}>
              Right Align
            </button>
          </div>
        </div>

        <div className="mt-4 container-fluid" style={{ border: '1px solid #ccc', margin: '2rem', width: '75vw' }}>
          <div contentEditable ref={editorRef} onInput={handleContentChange} style={{ minHeight: '800px', padding: '2rem', margin: '2rem', outline: 'none' }} />
        </div>


        <div className='d-flex'>

        
          <div className="d-flex flex-column" style={{ padding: '5px', margin: '2rem' }}>
            <label htmlFor="department" style={fontstyle}>
              Which department is this article relevant?
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
          <div className="d-flex flex-column" style={{ padding: '5px', margin: '2rem' }}>
          <label style={fontstyle}>Who is this article intended for?</label>
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


        <div style={{ padding: '5px', margin: '2rem' }}>
          <button style={fontstyle} onClick={() => handlePost(department, beneficiary, title, editableContent)}>
            Post
          </button>
        </div>
      </div>
      </div>
    </Container>
  );
}
