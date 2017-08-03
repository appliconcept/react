const Validator = (type, value, props)=>{
    
    //Pas d'erreur par defaut
    let error = false;
    let errorMsg = "";

    //Infos du champ
    let length = value.length;
    let required  = props.required ? props.required : false;
    let minlength = props.minlength ? props.minlength : 0;
    let maxlength = props.maxlength ? props.maxlength : 1000000;
    let typeInput = props.type ? props.type : "text";

    //Si requis ou pas vide
    if(required || value !== "" || value !== []){

        //Si vide
        if(length === 0){
            error = true;
            errorMsg = "champ obligatoire";
        }else{

            //Champ Input
            if(type === "Input"){
                //Mail
                if(typeInput === "mail"){
                    let regMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
                    if(!regMail.test(value)){
                        error = true;
                        errorMsg = "format mail incorrect";
                    }
                }
                //Phone
                else if(typeInput === "phone"){

                }
                //Mobile
                else if(typeInput === "mobile"){

                }
                //Number
                else if(typeInput === "number"){
                    let regNumber = /^[0-9]*$/;
                    if(!regNumber.test(value)){
                        error = true;
                        errorMsg = "Format incorrect, seulement des chiffres";
                    }

                }
                //Currency
                else if(typeInput === "currency"){

                }
                            
                //Minlength
                if(minlength > length){
                    error = true;
                    errorMsg = `${minlength} caracteres minimum`;
                }
                //Maxlength
                else if(maxlength < length){
                    error = true;
                    errorMsg = `${maxlength} caracteres maximum`;
                }
            }

            //Si champ CheckboxGroup
            if(type === "CheckboxGroup"){
                if(minlength > length){
                    error = true;
                    errorMsg = `Cochez au moins ${minlength} élèments`;
                }
                //Maxlength
                else if(maxlength < length){
                    error = true;
                    errorMsg = `Cochez au maximum ${maxlength} élèments`;
                }
            }
        }
    }

    //Retourner error et message d'erreur
    return {
        error: error,
        errorMsg: errorMsg
    }
}

export default Validator;