// Users & Complaints in LocalStorage
let users = JSON.parse(localStorage.getItem('users')||'[]');
let complaints = JSON.parse(localStorage.getItem('complaints')||'[]');
let currentUser=null;

// Login/Register Toggle
function showRegister(){document.getElementById('loginSection').style.display='none';document.getElementById('registerSection').style.display='block';}
function showLogin(){document.getElementById('registerSection').style.display='none';document.getElementById('loginSection').style.display='block';}

// Register User
function registerUser(){
  const name=document.getElementById('regName').value;
  const mobile=document.getElementById('regMobile').value;
  const pass=document.getElementById('regPass').value;
  if(!name||!mobile||!pass){alert("সব তথ্য দিন");return;}
  if(!/^\+8801[3-9]\d{8}$/.test(mobile)){alert("বাংলাদেশী মোবাইল নম্বর দিন");return;}
  if(users.find(u=>u.mobile===mobile)){alert("মোবাইল ইতিমধ্যেই আছে");return;}
  users.push({name,mobile,pass});
  localStorage.setItem('users',JSON.stringify(users));
  alert("Registration Success!"); loginUser(mobile,pass);
}

// Login User
function loginUser(mobileInput,passInput){
  const mobile=mobileInput||document.getElementById('loginMobile').value;
  const pass=passInput||document.getElementById('loginPass').value;
  const user = users.find(u=>u.mobile===mobile && u.pass===pass);
  if(user){currentUser=user; alert("Login Success! Open home.html");}
  else alert("Invalid Credentials");
}

// Submit Complaint
function submitComplaint(){
  if(!currentUser){alert("Login First");return;}
  const name=document.getElementById('cName').value;
  const mobile=document.getElementById('cMobile').value;
  const fraud=document.getElementById('cFraud').value;
  const transaction=document.getElementById('cTransaction').value;
  const id=complaints.length+1;
  complaints.push({id,name,mobile,fraud_type:fraud,transaction,status:'pending',likes:0,dislikes:0,comments:[]});
  localStorage.setItem('complaints',JSON.stringify(complaints));
  alert("Complaint Submitted! Waiting Admin Approval");
}

// Render Posts (Home Page)
function renderPosts(){
  const postsDiv=document.getElementById('posts');
  postsDiv.innerHTML="";
  complaints.filter(c=>c.status=='approved').forEach(c=>{
    const div=document.createElement('div'); div.className='postCard';
    div.innerHTML=`<b>${c.name}</b> (${c.mobile})<br>
      Fraud: ${c.fraud_type}<br>
      Transaction: ${c.transaction}<br>
      <div class="actions">
        <button onclick="c.dislikes++;renderPosts()">Dislike</button>
        <button onclick="c.likes++;renderPosts()">Like</button>
        👍${c.likes} | 👎${c.dislikes}
      </div>`;
    postsDiv.appendChild(div);
  });
}

// Admin Login
function adminLogin(){
  const user=prompt("Admin Username");
  const pass=prompt("Admin Password");
  if(user==='tarikul' && pass==='2026583'){alert("Admin Logged In! Open admin.html");}
  else alert("Invalid Admin Credentials");
}

// Approve/Reject (Admin Panel)
function approveComplaint(id){complaints.find(c=>c.id==id).status='approved';localStorage.setItem('complaints',JSON.stringify(complaints));}
function rejectComplaint(id){complaints=complaints.filter(c=>c.id!=id);localStorage.setItem('complaints',JSON.stringify(complaints));}