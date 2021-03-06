import React from 'react'
import { Alert } from 'react-bootstrap'

export const showErrMsg = (msg) => {
    return  <Alert variant="danger">{msg}</Alert>
}

export const showSuccessMsg = (msg) => {
    return  <Alert variant="success">{msg}</Alert>
}