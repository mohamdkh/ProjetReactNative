import http from "./http-common";
class Services {
    Register(email,mot_passe){
        const data={
                "email":email,
                "mot_passe":mot_passe
        }
       return http.post("/Account/Register",JSON.stringify(data))
    }
    Login(email,mot_passe){
        const data={
                "email":email,
                "mot_passe":mot_passe
        }
        return http.post("/Account/Login",JSON.stringify(data))
    }
    GetAllPlaces(){
        return http.get("/Point/GetAll")
    }
     SendData(data){
         let file=data.file
        const fd = new FormData(data);

        const dataform={
            "nom":data.nom,
            "type":data.type,
            "description":data.description,
            "lat":data.lat,
            "lat":data.lon,
        }
        fd.append('imagefile',{
            uri: Platform.OS === 'android' ? file.uri : 'file://' + file.uri,
            name: file.fileName,
            type: file.type // or your mime type what you want
        });
        fd.append('nom', data.nom);
         fd.append('type',data.type);
         fd.append('description', data.description);
         fd.append('lat',data.lat);
         fd.append('lon', data.lon);
         return   http.post("/Point/postData/",fd);
     }
}
export default new Services();