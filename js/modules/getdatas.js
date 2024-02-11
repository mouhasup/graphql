
export const getDatas = {
    skillsdata(data) {
        // console.log("datas:", data.skill);
        const datas = transformDataStructure(data.skill)
        return datas
    },
    auditdata(data) {
        const datas = {
            "up": roundToNearestUnit(data.infos[0].totalUp/1000000,2),
            "down": roundToNearestUnit(data.infos[0].totalDown/1000000,2),
            "ratio": roundToNearestUnit(data.infos[0].auditRatio,1)
        }
        // console.log("audit data:", datas)
        return datas
    },
    infosdata(data) {
        console.log("datasInfo:", data.infos[0].attrs.age)
        const datas = {
            "Last name": data.infos[0].lastName,
            "First name": data.infos[0].firstName,
            "Campus": data.infos[0].campus,
            "Email": data.infos[0].email,
            "Age": data.infos[0].attrs.age
        }
        console.log("NewdatasInfo:", datas)
        return datas;
    },
    xpprogessdata(data) {
        const datas = convertDataStructure(data.xp_progress)
        return datas
    },
    xpval(data){
        return Math.round(data.xp.aggregate.sum.amount/1000)
    },
}


function convertDataStructure(d1) {
    // Convertir les dates en secondes depuis l'époque Unix et calculer le cumul des montants
    const convertedData = d1.map(item => {
        const dateInSeconds = convertCreatedAtToSeconds(item.createdAt);
        return {
            amount: item.amount,
            date: dateInSeconds,
            createdAt: item.createdAt
        };
    });

    // Trier les données par date
    const sortedData = convertedData.slice().sort((a, b) => a.date - b.date);

    // Calculer le minimum et le maximum des montants et des dates
    
    const minDate = Math.min(...sortedData.map(item => item.date));

    // Calculer le cumul des montants
    let cumulativeAmount =  0;
    let diferential = minDate
    sortedData.forEach(item => {
        cumulativeAmount += item.amount;
        item.amount = cumulativeAmount;
        item.date = item.date- diferential
    });

    for (let i =  0; i < sortedData.length; i++) {
        sortedData[i].amount = roundToNearestUnit(sortedData[i].amount/1000,0)
    }
    const minDate2 = Math.min(...sortedData.map(item => item.date));
    const maxDate = Math.max(...sortedData.map(item => item.date));
    const minAmount = Math.min(...sortedData.map(item => item.amount));
    const maxAmount = Math.max(...sortedData.map(item => item.amount));

    // Construire la structure de données d2
    const d2 = {
        amount: {
            min: minAmount,
            max: maxAmount
        },
        date: {
            min: minDate2,
            max: maxDate
        },
        datas: sortedData
    };
    

    console.log("data sorted:", sortedData);
    console.log("cumulative:", sortedData);

    return d2;
}

function convertCreatedAtToSeconds(createdAtString) {
    const date = new Date(createdAtString);
    const timestampInMilliseconds = date.getTime();
    const timestampInSeconds = Math.floor(timestampInMilliseconds /  1000);
    return timestampInSeconds;
}

function transformDataStructure(d1) {
    console.log("d1: ", d1);
    // Créer un objet vide pour stocker les transformations
    const transformedData = {};

    // Parcourir chaque élément de d1
    d1.forEach(item => {
        // Utiliser la propriété 'type' comme clé et 'amount' comme valeur
        transformedData[item.type] = item.amount;
    });
    console.log("datatransformed:",transformedData)
    return transformedData;
}

function roundToNearestUnit(number,unit) {
    return Math.round(number * Math.pow(10,unit)) /  Math.pow(10,unit);
}