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
      setSize(data.sizes[0]);
      push('/doughs');
    },
    [push, setSize],
  );

  return (
    <div>
      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="sizes"
          options={checkboxSizesOptions}
          multiple={false}
        />
        <button type="submit">Continuar</button>
      </Form>
    </div>
  );
};

export default Size;
