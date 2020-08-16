import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import useOrder from '../../hooks/useOrder';

import CheckboxInput from '../../components/CheckboxInput';
import Button from '../../components/Button';

import { Container } from './styles';
import useToast from '../../hooks/useToast';

interface Size {
  id: string;
  name: string;
  description: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const Size: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { setSize } = useOrder();
  const { push } = useHistory();
  const { addToast } = useToast();

  const [apiSizes, setApiSizes] = useState<Size[]>([]);

  useEffect(() => {
    api.get<Size[]>('/sizes').then((response) => setApiSizes(response.data));
  }, []);

  const checkboxSizesOptions = useMemo<CheckboxOption[]>(
    () =>
      apiSizes.map((size) => ({
        id: size.id,
        value: size.name,
        label: size.name,
        description: size.description,
      })),
    [apiSizes],
  );

  const handleNext = useCallback(
    (data) => {
      if (data.sizes.length < 1) {
        addToast({
          title: 'Selecione o tamanho',
          description: 'Por favor, selecione o tamanho para continuar',
          type: 'error',
        });
        return;
      }

      const selectedSize = apiSizes
        .map((size) => size.name)
        .indexOf(data.sizes[0]);
      setSize(apiSizes[selectedSize]);
      push('/confirmation');
    },
    [apiSizes, setSize, push, addToast],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="sizes"
          options={checkboxSizesOptions}
          multiple={false}
        />
      </Form>
      <Button type="button" onClick={() => formRef.current?.submitForm()}>
        Selecionar
      </Button>
    </Container>
  );
};

export default Size;
