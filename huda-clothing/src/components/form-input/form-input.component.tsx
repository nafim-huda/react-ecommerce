import { InputHTMLAttributes, FC } from 'react';

import {Group, FormInputLabel, Input} from './form-input.styles'

// InputHTMLAttributes<HTMLInputElement> says we want all of the HTML attributes for an <input> element
type FormInputProps = { label: string, } & InputHTMLAttributes<HTMLInputElement>


const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {
                label && (
                    <FormInputLabel 
                    // if the length of otherProps is 0 -> falsy -> no shrink label applied
                    // else if length of otherProps > 0 -> truthy -> shrink label is applied
                    shrink={Boolean(
                        otherProps.value && 
                        typeof otherProps.value === 'string' && 
                        otherProps.value.length
                        )}>
                            {label}
                    </FormInputLabel>
                )
            }
        </Group>
    )
}

export default FormInput;