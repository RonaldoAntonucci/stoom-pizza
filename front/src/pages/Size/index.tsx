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
import useToast from '../../hooks/useToast';

import CheckboxInput from '../../components/CheckboxInput';
import Button from '../../components/Button';
import Footer from '../../components/Footer';

import { Container } from './styles';

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

  const { setSize, size } = useOrder();
  const { push } = useHistory();
  const { addToast } = useToast();

  const [apiSizes, setApiSizes] = useState<Size[]>([]);

  useEffect(() => {
    api
      .get<Size[]>('/sizes')
      .then((response) => setApiSizes(response.data))
      .catch(() => {
        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description:
            'Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.',
        });
      });
  }, [addToast]);

  const checkboxSizesOptions = useMemo<CheckboxOption[]>(
    () =>
      apiSizes.map((sizeData) => ({
        id: sizeData.id,
        value: sizeData.name,
        label: sizeData.name,
        description: sizeData.description,
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
        .map((sizeData) => sizeData.name)
        .indexOf(data.sizes[0]);
      setSize(apiSizes[selectedSize]);
      push('/confirmation');
    },
    [apiSizes, setSize, push, addToast],
  );

  return (
    <Container>
      <h1>Selecione o tamanho:</h1>

      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="sizes"
          options={checkboxSizesOptions}
          multiple={false}
          initialValue={[size?.id || '']}
        />
      </Form>
      <Footer>
        <Button
          type="button"
          align="start"
          color="neutral"
          onClick={() => push('/ingredients')}
        >
          Voltar
        </Button>
        <Button type="button" onClick={() => formRef.current?.submitForm()}>
          Selecionar
        </Button>
      </Footer>
    </Container>
  );
};

export default Size;
