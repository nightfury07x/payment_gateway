import React from 'react';
import { Redirect } from "react-router-dom";

import { Button, Form, Grid, Header, Image, Message, Segment, Label, Dropdown } from 'semantic-ui-react'

import Cleave from 'cleave.js/react'
import creditCardType from 'credit-card-type'




export default class CreditCardForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            name: '',
            ccv: '',
            expDate: '',
            cardNo: '',
            cardType: '',
            cardTypeImg: './images/cards/card.png',
            cardTypeccv: '',
            isCCValid: true,
            cardLength: 0,
            codeLength: 0,
            fromSubmit: false,
            isValidCard: false,
            isOkToSubmit: false,

            error: {
                name: '',
                cardNo: '',
                expdate: '',
                ccv: ''

            }

        };
    }

    handleChange = event => {

        // if(event.target.name == 'ccv' && event.target.value){
        //     this.setState({
        //         ['ccv']: 
        //     })
        // }
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            if (this.state.fromSubmit) {

                this.validate();
            }
        })

    }



    validate = () => {

        let formIsValid = true;

        let errors = {};

        if (this.state.name.length < 4) {

            errors.name = ' (Name should be greater than 4 charactors)';
            formIsValid = false;
        }
        else {
            errors.name = '';

        }

        if (!this.state.isValidCard) {

            errors.cardNo = ' (Invalid CardNo)';
            formIsValid = false;

        }
        else {

            if (this.state.cardNo.length < this.state.cardLength) {

                errors.cardNo = ' (Card Lenth Should be ' + this.state.cardLength + ' )';
                formIsValid = false;
            }
            else {
                errors.cardNo = '';

            }



        }



        if (this.state.expDate.length < 7) {


            errors.expDate = ' (Invalid Date)';
            formIsValid = false;
        }
        else {
            errors.expDate = '';

        }

        if (this.state.ccv.length < this.state.codeLength) {

            errors.ccv = 'Invalid Code';
            formIsValid = false;
        }
        else {
            errors.ccv = '';

        }

        this.setState({

            error: {

                ['name']: errors.name,
                ['cardNo']: errors.cardNo,
                ['ccv']: errors.ccv,
                ['expdate']: errors.expDate
            }

        })

        return formIsValid;


    }

    onChangeCard = event => {

        let cards = creditCardType(event.target.value);
        console.log(cards)
        if (cards.length > 0) {


            this.setState({

                cardNo: event.target.rawValue,
                cardType: " (" + cards[0].type + ")",
                cardTypeccv: cards[0].code["name"],
                codeLength: cards[0].code['size'],
                cardTypeImg: './images/cards/' + cards[0].type + '.png',
                isValidCard: true,
                cardLength: cards[0].lengths[0]
            }, () => {
                if (this.state.fromSubmit) {

                    this.validate();
                }
            })


        } else {

            this.setState({


                cardType: '',
                cardTypeccv: '',
                cardTypeImg: './images/cards/card.png',
                ccv: '',
                codeLength: 0,
                isValidCard: false,
                cardLength: 0,
            }, () => {
                if (this.state.fromSubmit) {

                    this.validate();
                }
            })




        }


        if (event.target.value.length == 0) {

            this.setState({


                cardType: '',
                cardTypeccv: '',
                cardTypeImg: './images/cards/card.png',
                ccv: '',
                codeLength: 0,
                isValidCard: false,
                cardLength: 0,
            }, () => {
                if (this.state.fromSubmit) {

                    this.validate();
                }
            })

        }




    }

    handleSubmit = event => {

        event.preventDefault();
        this.setState({
            fromSubmit: true
        }, () => {

            if( this.validate()){

                alert("Form submitted");
                this.setState({
                    isOkToSubmit: true
                })
            }
            
        
        })


    }

    render() {
        return (
            this.state.isOkToSubmit ? <Redirect
                to={{
                  pathname: "/process",
                  state: { }
                }}
              />:
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Payment Gateway
                </Header>

                    <Form method="post" size='large' onSubmit={this.handleSubmit.bind(this)}>
                        <Segment stacked>
                            <Grid >
                                <Grid.Row columns={1} centered>
                                    <Grid.Column >
                                        <Form.Field error={this.state.error.name.length > 0}>

                                            <Form.Input
                                                fluid icon='user'
                                                label={'Name On Card' + this.state.error.name}
                                                iconPosition='left'
                                                placeholder='Card Holders Name '
                                                value={this.state.name}
                                                onChange={this.handleChange.bind(this)}
                                                name='name'
                                                type={'text'}
                                            />

                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2} >
                                    <Grid.Column computer={13} mobile={12} tablet={13}>
                                        <Form.Field error={this.state.error.cardNo.length > 0}>
                                            <label style={{ float: 'left' }}>Card Number  {this.state.cardType} {this.state.error.cardNo}</label>
                                            <Cleave placeholder="Enter your credit card number"

                                                options={{

                                                    creditCard: true,
                                                    delimiter: '-',
                                                    width: 6
                                                }}
                                                onChange={this.onChangeCard.bind(this)}
                                                value={this.state.cardNo}
                                            />

                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column
                                        computer={3} mobile={4} tablet={3}
                                        verticalAlign={'bottom'}
                                    >
                                        <Image src={this.state.cardTypeImg} size='tiny' style={{ width: '60px', height: '36px', float: 'right', marginBottom: '1px' }} />

                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={2} centered>
                                    <Grid.Column width={12}>

                                        <Form.Field error={this.state.error.expdate.length > 0}>
                                            <label style={{ float: 'left' }}>Expire Date {this.state.error.expdate}</label>
                                            <Cleave placeholder="MM/YYYY" name='expDate'

                                                options={{
                                                    date: true,
                                                    datePattern: ['m', 'Y']
                                                }}
                                                onChange={this.handleChange.bind(this)}

                                            />


                                        </Form.Field>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        <Form.Field error={this.state.error.ccv.length > 0}>
                                            <label style={{ float: 'left' }}>Code : {this.state.cardTypeccv} {this.state.error.ccv}</label>

                                            <Form.Input fluid width={4} 
                                                maxLength={this.state.codeLength} 
                                                onChange={this.handleChange.bind(this)} 
                                                value={this.state.ccv} 
                                                name='ccv'
                                                type='number'
                                                min='0'
                                                />

                                        </Form.Field>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row columns={1}>
                                    <Grid.Column>
                                        {/* <Link to='/process'> */}
                                            <Button color='teal' fluid size='large' type='submit'>
                                                Process Payment

                                            </Button>
                                        {/* </Link> */}
                                        
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );

    }

}

