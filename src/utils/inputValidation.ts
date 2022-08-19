const specialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
const haveSpecialCharacters = (text:string) => {
    return !!text.match(specialCharacters);
}

interface validateCollectionTitleReturn{
    isValid:boolean
    errorMessage:string
}

export function validateCollectionTitle(value:string, collectionsData:MyCollections):validateCollectionTitleReturn{
    let validationFlag = true;
    let message = "";

    if(!value || value.trim() === ''){
        validationFlag = false;
    }else {
        if(haveSpecialCharacters(value)){
            validationFlag = false;
            message = "No special characters allowed.";
        }
        for (let i = 0; i < collectionsData.length; i++) {
            if (collectionsData[i].title === value) {
                validationFlag = false;
                message = "You have the collection with this title already! Please input the different title."
            }
        }

        if(value.length > 100){
            validationFlag = false;
            message = "Please input the shorter title.";
        }
    }

    return { isValid: validationFlag, errorMessage: message }
}