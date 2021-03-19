const { replaceAll, checkCity, checkFullForm, dateFormatter } = require('./services');

//let data = makeJsonData()
const COMMA_ENTRIES = [ // First name, City, Birth date
    'Mckayla, Atlanta, 5/29/1986',
    'Elliot, New York City, 4/3/1947',
]
const DOLLAR_ENTRIES = [ // City, Birth date, Last name, First name
    'LA $ 10-4-1974 $ Nolan $ Rhiannon',
    'NYC $ 12-1-1962 $ Bruen $ Rigoberto',
    'Abilene $ 12-1-1962 $ Bruen $ Sandeep'
]


// WRITE YOUR FUNCTIONS / CLASSES HERE
class App {
    static run({ comma = [], dollar = [] }) {

        let parsedObj = [];
        let addData = [];
        dollar.map(res => {
            let mau = replaceAll(res, '$', ',');
            addData.push(mau);
        });
        //concated the both the array;
        const alldata = comma.concat(addData);
        //function to make a recognisable object
        alldata.map(str => {
            const alldatas = str.split(',');
            const cart = {};
            alldatas.map(str => {
                if (!isNaN(str.charAt(1))) {
                    let dateFormatted = dateFormatter(str)
                    cart.date = dateFormatted;
                } else {
                    let trimeeddata = str.trim();
                    if (checkCity(trimeeddata)) {
                        cart.city = trimeeddata;
                    } else {
                        cart.firstName = trimeeddata;
                    }
                }
            });
            parsedObj.push(cart);
        });

        //printing data according to standard output
        parsedObj.map(data => {
            let city = '';
            if (data.city) {
                let alwaysFullForm = checkFullForm(data.city.trim())
                city = alwaysFullForm;
            }
            console.log(`${data.firstName.trim()} ${city} ${data.date}`);
            city = "";
        });
    }
}


App.run({ comma: COMMA_ENTRIES, dollar: DOLLAR_ENTRIES })