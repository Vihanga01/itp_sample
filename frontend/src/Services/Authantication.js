export default{
    login : async user=>{
    const res = await fetch('/customer/login', {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status !== 401)
        return res.json().then(data => data);
  
      else
        return { isAthenticated: false, user: { username: "", role: "" } };
  
    },
    /*register : async user=>{
      const res = await fetch('/customer/register', {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      return data;
  
    },*/
    logout : async ()=>{
      const res = await fetch('/customer/logout');
      const data = await res.json();
      return data;
    },
  
    isAthenticated : async ()=>{
      const res = await fetch('/customer/customerauthenticated');
      if (res.status !== 401)
        return res.json().then(data => data);
  
      else
        return { isAuthenticated: false, user: { username: "", role: "" } };
    }
  }