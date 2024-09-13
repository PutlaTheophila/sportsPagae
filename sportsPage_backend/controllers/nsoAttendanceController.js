import asyncErrorHandler from "../utils/async-error-handler.js";
import User from "../models/userModel.js";
import CustomError from "../utils/customError.js";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import getDate from "../utils/date.js";

const serviceAccountAuth = new JWT({
    email: 'sheets@western-cirrus-434622-r7.iam.gserviceaccount.com',
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCsur+s08SjLlRC\nVmAZyw8E+6lIJSF2A3fNX4n4a9cIkPAOorJVDOtWaMDGcw/CGQDd2hHDjAMBvrGU\ns2pBkB+i4R5QcllBxVCYDmnOUrIVfeOvxnE0jR8mMjwEWimAKnAfigfABFUIJh8u\nmFcm6HSQZn7cdUPMMMmM8y28XTu/gqkRSbXYWJ2rNzs5gwuiAYkt0PyAZUfjoKzZ\niEiHBe7Iw0mZoIvnEBmWcGSKs/q3o0EikD89uhWjiLac8q4OeZTWf7dWPJd1UolG\nwXoSsnLQh/2jMJuvRdPN0sR0ZU38akGcllkwNM2fuJD6eZl/b0x2GFwgc3+e4z2G\n9Q/9nH9XAgMBAAECggEAPKxCfOZMGZfCACVQD29c4L63mUB1rvsL34eSMsFKoNcs\ng6+Rnb9ygQE9ydeL7v2SaNtbRwmM2tWNkjKtfccu3ate1xo7kRdKtobFkrRImrUE\nP++gPznc+bFGlK7JChyeEu4Mx92dssWVSWw4nNGldD2UjULhpD105r5az+IeBSg+\n6oC5P6sDZLUAn0Eq1yK+OC8aGAE5Y8+JzSN0PuSUEdHn8OS0cqV4a7EsrYsDrl1F\nDkx3etzOQ5OIoiCpmSXyEWV2HvHvLvJrwcRhjTrJe/zk6hOOHiFpeZ7jrYTeovrF\nexB50iUIscBBe0l23VO3b57R7ESGWy2Lfl+/whkj/QKBgQDunuUJAROAGPIOLSyF\nvj2d5Z4MXKetSHrOy767WpEz/sOPilA84+RNQB70Q7GSS/s9e2VHH2cAZ4iDNfcU\nGtafxCRti2lG8kwff3AZqX2rdTmTd/aX3n/HyUPtgHHKVQvZGwaG/NaYTicDTD7z\nUOR1qXMuSZuUgow8yXpk6dNewwKBgQC5T050HFpzFfMRyfeszXe9UlwMKu6c/bLk\nHNHFVBSSJnX2fbBXeKCAdFkYtNbQHX2eP++Pboc0FBX+o6ATs4gksQj2e+LD2YIZ\nVKQ5/QLF3nf6kEji7hkdtzughNy7bjGSGq+zCLeDb+fpr42UKc9FluQukRAPGZr1\nYDmvHDR73QKBgQDPbK45sobJ/mVDb39ZTzLus7A8nLphRjUC2FeXMzYvlZFXkGsJ\nUyyc/lUqDkIoowXlvwMd3S1DS7x+GoYKIv5YaT8lPl+ofW0woC3JEO2eAsum5kwk\nXhSDjfAPX20K7fzbn8N/yf+c66q8EiZSigneQgtOvEuSwBy5poZPfHbx0wKBgA72\npHMjxvn8D8Cj+mftv3l+KQiiftoWcleRLC8u9upGSMg6pf6qMuuseXVRRPdRKk+Z\nAhMm7av64zvIoqh0ms27remZX1pJOgQpnYlBMPQhXrbQ59HLQCPyI9J2aAyKfV46\n4W0niwoGA0gPcPNB3QbVhF9uP0m425ZsyrulH2fRAoGBAOyf/VFegNawdr6eii7y\nrqnB/E6YrijfCGBUJd8+zpEna7CBjMWYacmdgiwU8hW2/WOAI4wuL5e7ToOrXzrJ\nuPkttsNXEFBavG9Oi1ondNzl9lq+cw0O1OmCY5Zwh7nfDIzM+eKU6I8G5JLLZfPu\nrJCjsZaloiirz7P4pZsHmslc\n-----END PRIVATE KEY-----\n",
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});      
const doc = new GoogleSpreadsheet('1FZTn2GNyrvy0LzyLC7pbCDRP5qhNCWlBo_vl5bWL-9U', serviceAccountAuth);


await doc.loadInfo(); 
console.log(doc.title);
await doc.updateProperties({ title: 'sports_iitbhilai' });


export const getAttendance = asyncErrorHandler(async (req , res)=>{

    // heer we are finding the user and his email
    const email = req?.session?.passport?.user?.emails[0]?.value || 'sample1@gmail.com';
    console.log(email);

    // detecting sport  of user
    const sheet = doc.sheetsByTitle['badminton']; 
    const rows = await sheet.getRows();
    console.log('rows fetched');

    // checking if the date column is present in the sheet and updating the column it is not present
    const headers = await sheet.headerValues;
    const matchedData = rows.find(row => row.get('email') === email);
    console.log(matchedData);
    const rowData = {};
    headers.forEach(header => {
      rowData[header] = matchedData.get(header) ;
    });
    console.log(rowData)
    const data = rowData
    // console.log(matchedData);
    // console.log(rows[0]);
    res.status(200).json({
        status:'sucess',
        data
    })
})


export const sendStudents = asyncErrorHandler(async (req, res, next) => {

        // Fetch the email from the session or default to 'putlatheophila1@gmail.com'
    const email = req?.session?.passport?.user?.emails[0]?.value || 'putlatheophila1@gmail.com';
    
    // Find the coordinator by email
    const coordinator = await User.findOne({ email: "putlatheophila1@gmail.com" });

    // If coordinator not found, return a 404 error
    if (!coordinator) {
        return next(new CustomError('You do not have access to this route', 404));
    }

    // Ensure that the coordinator's sport is available
    console.log(coordinator.sport.toString());

    // Assuming you have the Google Sheet document (`doc`) already initialized
    const sheet = doc.sheetsByTitle['badminton'];  // Get the sheet by title ('athletics')

    // Fetch all rows from the sheet
    await sheet.loadHeaderRow();

        // Get all rows from the sheet
        const rows = await sheet.getRows();
        const headers = sheet.headerValues;  // Get the headers from the first row

        let students = [];  // Initialize the array to hold the students data

        // Iterate over each row and map it to a key-value pair object using headers
        rows.forEach((row) => {
            let object = {};
            headers.forEach((header) => {
                object[header] = row.get(header);  // Directly access row data using headers as keys
            });
            students.push(object);  // Add the mapped row object to the students array
        });

        let modifiedUsers = [];
        students.map((student)=>{
            modifiedUsers.push({'name':student.name , 'id':student.id })
        })

        // now we have the students array so we can send them to front end for rendering


    res.status(200).json({
        status: 'success',
        message: 'Data fetched successfully',
        players:modifiedUsers
    });


});



export const postAttendance = asyncErrorHandler(async(req , res ,next) =>{
    const studentId = req.params.id;
    const coordinatorEmail =  req?.session?.passport?.user?.emails[0]?.value;  
    const coordinator = await User.findOne({email:coordinatorEmail});
    if(!coordinator){
        return next(new CustomError ('you dont have access to post attendance'))
    }

    const sheet = doc.sheetsByTitle[coordinator.sport];
    let rows = await sheet.getRows();


    // use thse id nums on front end to make coordi select from his list of students
    const idNumbers = rows.map((row) =>{
         return row.get('id')
    })

    // date checker 
    const headers = await sheet.headerValues;
    console.log(headers);
    const currentDate = headers.find(cell=>cell === getDate);
    console.log(currentDate);
    if(!currentDate){
        console.log('no date column found');
        let newValues=[...headers];
        newValues.push(getDate);
        await sheet.setHeaderRow(newValues);
        await sheet.loadCells
        rows = await sheet.getRows();   
    }

    // const studentId = req.params.id;
    console.log(studentId);
    const studentRow = rows.find(row => row.get('id') === studentId.toString());
    if(!studentRow) return (next( new CustomError('invalid student id' , 200)))


    //attendance updating
    console.log(studentRow._rowNumber);
    const rowIndex = (studentRow._rowNumber - 2).toString();
    console.log(rowIndex);
    rows[rowIndex].set(currentDate ,'1'); 
    await rows[rowIndex].save();
    console.log(idNumbers);
    res.status(200).json({
        status:'success',
        data:'sucessfully posted',
        message:'sucessfuly posted attendance'
    });
})