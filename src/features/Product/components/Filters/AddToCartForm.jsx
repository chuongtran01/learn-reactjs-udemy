import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputField from 'components/form-controls/InputField/index';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/InputField/QuantityField/index';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func,
};

function AddToCartForm({onSubmit = null}) {
    const schema = yup.object().shape({
        quantity: yup.number().required('Please enter quantity').min(1, 'Minimum quantity is one').typeError('Please enter a number'),
    })

    const form = useForm({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values)
        }
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name='quantity' label='Quantity' form={form}/>

            <Button type='submit' variant='contained' color='primary' style={{width: '250px'}} size='large'>
                ADD TO CART
            </Button>
            
        </form>
    );
}

export default AddToCartForm;