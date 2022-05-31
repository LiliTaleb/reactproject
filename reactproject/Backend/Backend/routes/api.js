'use strict';
var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const axios = require("axios");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mailtest082521@gmail.com',
        pass: 'rnkboogoenqqkdsb'
    }
});
/* GET users listing. */
router.post('/submit', async function (req, res) {
    const { email, phoneNo, firstName, lastName, isPhoneNo, isEmail, selectedSupervisor } = req.body;
    try {
        console.log({ email, phoneNo, firstName, lastName, isPhoneNo, isEmail, selectedSupervisor });
        if (!firstName || !lastName || !selectedSupervisor) {
            throw new Error('First Name, Last Name and Supervisor are required');
        }
        if (firstName.trim() == "" || lastName.trim() == "" || selectedSupervisor.trim() == "" || selectedSupervisor.trim() == "-1") {
            throw new Error('First Name, Last Name and Supervisor are required');
        }

        if (isEmail) {
            if (!email) throw 'Email is required to send email';
            if (email.trim() == "") throw 'Email is required to send email';
            let body = `First Name:${firstName} <br/>`;
            body += `Last Name:${lastName} <br/>`;
            body += `Email:${email} <br/>`;
            body += `Phone:${phoneNo} <br/>`;
            body += `Supervisor:${selectedSupervisor} <br/>`;
            var mailOptions = {
                from: 'mailtest082521@gmail.com',
                to: email,
                subject: 'Notification',
                //text: body
                html: body
            };


            await transporter.sendMail(mailOptions)
            
            res.send({ email, phoneNo, firstName, lastName, isPhoneNo, isEmail, selectedSupervisor });
            return

        }
        else {
            
            res.send({ email, phoneNo, firstName, lastName, isPhoneNo, isEmail, selectedSupervisor });
        }
    } catch (e) {
        //console.log(ex);
        console.log(e.message);
        if (e && e.message) {
            return res.status(400).send(e.message);
        }
        else {
            return res.status(400).send("Error");
        }
        return
    }
});

router.get('/supervisors', async function (req, res) {
    try {
        let ress = await axios.get('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers')
        //console.log(ress);
        if (ress.data && ress.data.length > 0) {
            let numericJusrisdictionRemoved = ress.data.filter(x => /^\d+$/.test(x.jurisdiction) == false)
            numericJusrisdictionRemoved = numericJusrisdictionRemoved.sort(fieldSorter(['jurisdiction', 'lastName', 'firstName']))
            numericJusrisdictionRemoved = numericJusrisdictionRemoved.map(x => { return `${x.jurisdiction}-${x.firstName}-${x.lastName}` })
            res.send(numericJusrisdictionRemoved)
        }

        return;
    }
    catch (ex) {
        console.log("ERORRRRRRRRRRRRRRRRRRRRRRRRRRR")
        console.log(ex.message)
        res.sendStatus(500);
        return;
    }
});

function fieldSorter(fields) {
    return function (a, b) {
        return fields
            .map(function (o) {
                var dir = 1;
                if (o[0] === '-') {
                    dir = -1;
                    o = o.substring(1);
                }
                if (a[o] > b[o]) return dir;
                if (a[o] < b[o]) return -(dir);
                return 0;
            })
            .reduce(function firstNonZeroValue(p, n) {
                return p ? p : n;
            }, 0);
    };
}
module.exports = router;
