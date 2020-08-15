/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import { Container, Label, InputContent } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
    description?: string;
  }[];
}

const CheckboxInput: React.FC<Props> = ({
  name,
  options,
  multiple = true,
  ...rest
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const { fieldName, registerField, defaultValue = [] } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.filter((ref) => ref.checked).map((ref) => ref.value);
      },
      clearValue: (refs: HTMLInputElement[]) => {
        refs.forEach((ref) => {
          ref.checked = false;
        });
      },
      setValue: (refs: HTMLInputElement[], values: string[]) => {
        refs.forEach((ref) => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);
  return (
    <Container>
      {options.map((option, index) => (
        <Label htmlFor={option.id} key={option.id}>
          <input
            defaultChecked={defaultValue.find((dv: string) => dv === option.id)}
            ref={(ref) => {
              inputRefs.current[index] = ref as HTMLInputElement;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            onChange={() => {
              if (!multiple) {
                inputRefs.current.forEach((input, refIndex) => {
                  if (refIndex !== index) {
                    input.checked = false;
                  }
                });
              }
            }}
            {...rest}
          />

          <InputContent>
            {option.label}
            {option.description && <p>{option.description}</p>}
          </InputContent>
        </Label>
      ))}
    </Container>
  );
};
export default CheckboxInput;
