const express = require('express'); //Import Express
const Joi = require('joi'); //import Joi
const app = express(); //Create Express Application on the app variable
app.use(express.json()); //used the json file

//Give data to the server
const customers = [
    {title: 'Mark', id: 1},
    {title: 'Mary', id: 2},
    {title: 'Segun', id: 3},
    {title: 'Tosin', id: 4},
    {title: 'Tyler', id: 5}
]

//Read Request Handlers
//Display the Message when the URL consist of '/'
app.get('/', (req, res) => {
    res.send('Welcome to Tars Rest API');
})
//Display the List of Customers when URL consists of api customers
app.get('/api/customers', (req, res) => {
    res.send(customers);
});
//Display the information of specific customer when mention the id.
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt (req.params.id));
// If there is no valid customer ID, then display an error with the following message
    if (!customer) res.status(404) .send('<h2 style="font-family: Malgun Gothic: color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(customer);
});

//CREATE Request Handler
//CREATE New Customer Information
app.post('/api/customers', (req, res)=> {

    const { error } = validateCustomer (req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    //Increment the customer id
    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

//Update Request Handler
//Update Existing Customer Information
app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c=> c.id === parseInt (req.params.id));
    if (!customer) res.status(404) .send('<h2 style="font-family: Malgun Gothic: color: darkred;">Ooops... Cant find what you are looking for!</h2>');    
    const { error } = validateCustomer(req.body) ;
    if (error) {
        res.status(400) .send(error.details[0].message);
        return;
    }

    customer.title = req.body.title;
    res.send(customer);
});

//Delete Request Handler
//Delete Customer Details


// Delete Request Handler
// Delete Customer Details
app.delete('/api/customers/:id', (req, res) => {
    const customerId = parseInt(req.params.id);
    const customerIndex = customers.findIndex(c => c.id === customerId);

    if (customerIndex === -1) {
        return res.status(404).send('<h2 style="font-family: Malgun Gothic: color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    }

    customers.splice(customerIndex, 1);
    res.send(customers);
});


//app.delete('/api/customers/:id', (req, res) => {

//    const customer = customers.find(c=> c.id === parseInt (req.params.id));
 //   if (!customer) res.status(404) .send('<h2 style="font-family: Malgun Gothic: color: darkred;">Ooops... Cant find what you are looking for!</h2>');    
 //   const index = customers.indexOf(customer) ;
 //   customer.splice(index,1);

 //   res.send(customer);
//});
//Validate Information
function validateCustomer(customer) {
    const schema = Joi.object({
        title: Joi.string().min(3).required()
    });

    return schema.validate(customer);
}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Listening on port ${port}..'));