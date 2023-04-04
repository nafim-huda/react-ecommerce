import {Group, FormInputLabel, Input} from './form-input.styles.jsx'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {
                label && (
                    <FormInputLabel 
                    // if the length of otherProps is 0 -> falsy -> no shrink label applied
                    // else if length of otherProps > 0 -> truthy -> shrink label is applied
                    shrink={otherProps.value.length}>
                        {label}
                    </FormInputLabel>
                )
            }
        </Group>
    )
}

export default FormInput;