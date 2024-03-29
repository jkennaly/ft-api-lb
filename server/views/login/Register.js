// Register.js
// components: login/components

/*
submit function(event) => called on form submit, receivng event object
imgSrc String => supplied as src for logo
attrs.formInputs Array<FormData>: Array of form data objects: {
    placeholder String: input placeholder text,
    required Boolean: required to Submit form,
    classes String: List of classes; valid entry for html class,
    type String: type of input
}
attrs.peerLinks Array<PeerLink>: Array of objects containing links to peer forms, with link text
*/

const m = require('mithril')
const FormCore = require('./FormCore.js')


const Register = {
    //oncreate: console.log('Launched'),
    //onupdate: () => console.log('Register update'),
    view: ({ attrs }) => m('div.c44-login-container',
        m('section.c44-login-content',
            attrs.imgSrc ? m(`img.c44-login-img[src=${attrs.imgSrc}]`) : '',
            m(FormCore, {
                submit: attrs.submit ? attrs.submit : e => {
                    e.preventDefault()
                    console.log('Login.jsx Form submitted!')
                },
                formHeader: attrs.formHeader ? attrs.formHeader : 'Registration',
                submitName: 'Register',
                action: attrs.action,
                formInputs: attrs.formInputs ? attrs.formInputs : [{
                    type: "text",
                    placeholder: "Username",
                    required: true,
                    classes: "c44-login-username"
                }, {
                    type: "email",
                    placeholder: "Email",
                    required: true,
                    classes: "c44-login-email"
                }, {
                    type: "password",
                    placeholder: "Password",
                    required: true,
                    classes: "c44-login-password"

                }],
                peerLinks: attrs.peerLinks ? attrs.peerLinks : [
                    {
                        route: '/authorize/forgot',
                        text: 'Lost Your Password?'
                    }, {
                        route: '/authorize/login',
                        text: 'Log In'
                    }
                ]

            })
        )
    )


}
module.exports = Register;
