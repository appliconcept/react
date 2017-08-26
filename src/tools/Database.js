import Storage from "./Storage";
import * as Settings from "./Settings";
import axios from "axios";
import qs from "qs";
const uuid = require('uuid/v4');
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

class Database{
    type = "";

    constructor(type){
        this.type= type;
    }

    //requete envoyer au serveur
    params=()=>{
        let applanguage = Storage.get("applanguage");
        let userid = Storage.get("userid");
        let userkey = Storage.get("userkey");
        return Promise.all([applanguage, userid, userkey]).then((values)=>{
            return Promise.resolve({
                appcode: Settings.appcode,
                applanguage: values[0] !== "" ? values[0] : Settings.applanguage,
                userid: values[1],
                userkey: values[2],
                action: "",
                type: "",
                itemid: Settings.appname + "-" + uuid(),
                orderby: {
                    key: "APC-DATE",
                    order: "DESC",
                    type: "STRING"
                },
                resultsperpage: "-1",
                page: "1",
                logintype: "MAIL",
                metas: {
                    userid: values[1]
                }
            });
        });      
    }

    //Creer un item
    create=(metas)=>{
        return this.params().then((params)=>{
            params.action = "create";
            params.type = this.type;
            params.metas = { ...params.metas, ...metas};
            
            return this.send(params);
        });
    }

    delete=(itemid)=>{
        return this.params().then((params)=>{
            params.action = "delete";
            params.type = this.type;
            params.itemid = itemid;
            
            return this.send(params);
        });
    }

    update=(itemid, metas)=>{
        return this.params().then((params)=>{
            params.action = "update";
            params.type = this.type;
            params.itemid = itemid;
            params.metas = { ...params.metas, ...metas};
            
            return this.send(params);
        });
    }

    // metas[mail , password] si logintype fb que le mail
    login=(metas, logintype="MAIL")=>{
        return this.params().then((params)=>{
            params.action = "login";
            params.type = this.type;
            params.metas = { ...params.metas, ...metas}; 
            params.logintype = logintype;

            return this.send(params).then((data)=>{
                if(data.error !== undefined && data.error !== null && data.error === ""){
                    Storage.set("userkey", data.response.userkey);
                    Storage.set("userid", data.response.userid);
                    Storage.set("usermail", data.response.metas.mail);
                    return Promise.resolve(data);
                }else{
                    return Promise.resolve(data);
                }
            });
        });        
    }

    //logout
    logout=()=>{
        let unsetkey = Storage.set("userkey", "");
        let unsetid = Storage.set("userid", "");
        let unsetmail = Storage.set("usermail", "");
        return Promise.all([unsetkey, unsetid, unsetmail]).then((values)=>{
            return Promise.resolve(true);
        });
    }

    // metas[mail]
    recover=(metas)=>{
        return this.params().then((params)=>{
            params.action = "recover" ;
            params.type = this.type;
            params.metas = { ...params.metas, ...metas};
            
            return this.send(params);
        });
    }

    //itemid
    infos=(itemid)=>{
        return this.params().then((params)=>{
            params.action = "infos";
            params.type = this.type; 
            params.itemid = itemid;
            
            return this.send(params);
        });
    }

    search=(metas={}, resultsperpage=-1, page=1, orderby={key: "APC-DATE", order: "ASC", type: "STRING"})=>{
        return this.params().then((params)=>{
            params.action = "search";
            params.type = this.type;
            params.metas = { ...params.metas, ...metas};
            params.resultsperpage = resultsperpage;
            params.page = page;
            params.orderby = orderby;

            return this.send(params).then((data)=>{
                if(data.error !== undefined && data.error !== null && data.error === ""){
                    return Promise.resolve(data);
                }else{
                    return Promise.reject(data.error);
                }
            });
        });
    }

    send(params){     
        return axios.post(Settings.service, qs.stringify(params)).then((data)=>{
            return Promise.resolve(data.data);
        }).catch((e)=>{
            return Promise.reject(e);
        });
    }
}

const User = new Database("user");
const Category = new Database("category");
const Product = new Database("product");
const Fournisseur = new Database("fournisseur");
const Group = new Database("group");
const Facture = new Database("facture");

export {User, Category, Fournisseur, Group, Facture, Product}