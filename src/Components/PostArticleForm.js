import { useState } from "react";
import Swal from 'sweetalert2';
import { Button } from "react-bootstrap";

export default function PostArticleForm({content,user, isPlaceholderVisible}){

    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [department, setDepartment] = useState('company-wide');
    const [beneficiary, setBenificiary] = useState([]);
    const [images, setImages] = useState([]);
    const fontstyle = {
        fontSize: '12.8px',
        borderRadius:'5px',
        borderColor:'#383C3F'
      };
      const handleFileChange = (event) => {
        const fileList = Array.from(event.target.files);
        setImages(fileList);
      };
    
      const renderImagePreviews = () => {
        return images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Preview-${index}`}
            className="img-thumbnail mr-2 mb-2"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ));
      };
    
    const handleDepartmentChange = (selectedDepartment) => {
        setDepartment(selectedDepartment);
    };

    const beneficiariesOptions = ['everyone', 'managers', 'newHires', 'executives'];

    const handleBeneficiaryChange = (selectedBeneficiaries) => {
    setBenificiary(selectedBeneficiaries);
    };
    
    const buttonStyle = {
        fontSize: '12.8px',
        backgroundColor:'#016B83'
    }

    const handlePost = async(event) => {
        event.preventDefault();
        setLoading(true);

        if (title === '' || title.length < 4) {
            setLoading(false);
            Swal.fire({
                title: 'Something went wrong :(',
                text: 'Title is empty or is too short.',
                customClass: {
                    confirmButton: 'swal-red-button',
                },
            });
        } else {
            const formData = new FormData();
            formData.append('department', department);
            formData.append('beneficiary', JSON.stringify(beneficiary));
            formData.append('title', title);
            formData.append('content', content);
            formData.append('originalPostDate', new Date().toISOString());
            formData.append('latestUpdate', new Date().toISOString());
            formData.append('author', user.id);
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
              }
            await fetch(`${process.env.REACT_APP_API_URL}/api/articles/newArticle`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: formData,
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
                            window.location.href = '/wiki';
                        },
                    });
                } else {
                    Swal.fire({
                        title: 'Something went wrong. :(',
                        text: 'Please try again',
                    });
                    setLoading(false);
                }
            });
        }
    };
    return(
        <>
        <div>
            <form onSubmit={handlePost}>
                
                
                <div>
                    
                    <div className='p-5 text-center'>
                        <h6 className='mb-0'><u>Ready to post your article?</u></h6>
                        <span className='text-muted smallest'><i>Kindly fill the necessary information below...</i></span>
                    </div>
                    
                    <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
                        <label style={fontstyle} htmlFor="title" className='text-center form-label'><b>Please enter the title of this article you created...</b></label>
                        <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                        placeholder='Type the title here...'
                        style={{fontSize:'12.8px', width:'400px', borderRadius:'5px'}}
                        className='p-2 form-control'
                        />
                    </div>
                    
                    <div className="d-flex flex-column mt-0" style={{ padding: '5px', margin: '2rem' }}>
                        <label htmlFor="department" style={fontstyle} className="form-label">
                        <b>To which department is this article relevant?</b>
                        </label>
                        <select className="form-control" style={fontstyle} id="department" onChange={(e) => handleDepartmentChange(e.target.value)} value={department}>
                            <option value="company-wide">Company-wide</option>
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

                    <div className="d-flex flex-column justify-content-center" style={{ padding: '5px', margin: '2rem'}} >
                    <label htmlFor="images" className="form-label small">
                    <b>Attach Images</b>(optional):
                    </label>
                    <input
                        type="file"
                        className="form-control small"
                        id="images"
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        style={{width:'250px', border:'none', backgroundColor:'inherit'}}
                    />
                    
                    <div className="mt-2">{renderImagePreviews()}</div>
                    </div>
                    
                    <div className='mt-0' style={{ padding: '5px', margin: '2rem' }}>
                    <Button
                        style={buttonStyle}
                        type="submit"
                        disabled={loading || isPlaceholderVisible || title==='' || beneficiary.length === 0} // Disable the button when loading is true
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                    </div>
                </div>
                
            </form>
        </div>
        
        </>
    )
}