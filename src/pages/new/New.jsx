import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);
  const [profileName, setProfileName] = useState([]);
  const [email, setEmail] = useState([]);
  const [phone, setPhone] = useState([]);
  const [profileImage, setImage] = useState([]);

  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  

  useEffect(() => {
    const fetchData = async() =>{
      let list = [];
      console.log("currentUser.uid" + currentUser.uid);
      const docRef = doc(db, "profiles", currentUser.uid);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setProfileName(docSnap.data().name);
        setEmail(docSnap.data().email);
        setPhone(docSnap.data().phone);
        setImage(docSnap.data().image);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      //setData(list);
    }
    fetchData()
  },[])

  useEffect(() => {
    const uploadFile = () => {
      const name = "profile_" + file.name;
      const storageRef = ref(storage, "avatar/"+name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPer(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setData((prev)=>({...prev, image:downloadURL}));
          });
        }
      );
    };
    file && uploadFile();

  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value});
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      console.log("currentUser.uid" + currentUser.uid);
      
      console.log("data with image", data)
      const res = await setDoc(doc(db, "profiles", currentUser.uid),{
        ...data,
      }, { merge: true })
      navigate(-1)
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
    <Sidebar/>
    <div className="newContainer">
      <Navbar/>
      <div className="content">
          <div className="col-md-10 mr-auto ml-auto">
          <div className="card card-plain">
             
            
              <form>
                <div className="card-header text-center">
                    <h3 className="card-title">
                      Profile Details
                    </h3>
                    <h5 className="description">Here you can see and update Profile details.</h5>
                    


                  <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane show active" id="info">
                      
                      <div className="row justify-content-center mt-5">
                      
                      
                     
                      <div className="col-sm-5">

                      <img
                                        src={
                                            file
                                            ? URL.createObjectURL(file)
                                            : profileImage
                                        }
                                        alt="avatar"
                                        class = "imgtype"
                                        
                                        />

                      <div class="fileinput-preview fileinput-exists thumbnail"></div>
                      <div>
                          <span class="btn btn-primary btn-simple btn-file">
                              <label htmlFor="file">Select image</label>
                              
                              <input
                                  type="file"
                                  id="file"
                                  onChange={(e) => setFile(e.target.files[0])}
                                  style={{ display: "none" }}
                                  />
                              </span>                 
                      </div>
                      
                      <p></p>
                      <p></p>
                        
                      <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                              <i class="tim-icons icon-single-02"></i>
                              </div>
                            </div>
                            <input id="name" type="text" placeholder={profileName} class="form-control" onChange={handleInput}/>
                          </div>

                          <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                              <i class="tim-icons icon-mobile"></i>
                              </div>
                            </div>
                            <input id="phone" type="text" placeholder={phone} class="form-control" onChange={handleInput}/>
                          </div>

                          <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                              <i class="tim-icons icon-email-85"></i>
                              </div>
                            </div>
                            <input id="email" type="mail" placeholder={email} class="form-control" disabled/>
                          </div>
                      
                          
                          
                        </div>
                      
                      </div>
                    </div>

                    

                    

             
             
             
              </div>
              <div class="card-footer">
                  
                    <input type='button' class='btn btn-next btn-fill btn-green btn-wd' name='update' value='Update' disabled={per!=null && per<1} onClick={handleUpdate}/>
                    
                      
                  
                  
                  <div class="clearfix"></div>
                </div>
              </div>   
               
            </div>
          
          
          
                
          </form>
          </div>
      </div>
      </div>
      </div>
      </div>

  );
};
export default New;
