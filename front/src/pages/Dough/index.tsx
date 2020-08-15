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

interface Dough {
  id: string;
  name: string;
  description: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

const Dough: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { setIngredients } = useOrder();
  const { push } = useHistory();

  const [apiDoughs, setApiDoughs] = useState<Dough[]>([]);

  useEffect(() => {
    api.get<Dough[]>('/doughs').then((response) => setApiDoughs(response.data));
  }, []);

  const checkboxDoughsOptions = useMemo<CheckboxOption[]>(
    () =>
      apiDoughs.map((doughs) => ({
        id: doughs.id,
        value: doughs.name,
        label: doughs.name,
        description: doughs.description,
      })),
    [apiDoughs],
  );

  const handleNext = useCallback(
    (data) => {
      setIngredients(data.doughs[0]);
      push('/ingredients');
    },
    [push, setIngredients],
  );

  return (
    <div>
      <Form ref={formRef} onSubmit={handleNext}>
        <CheckboxInput
          name="doughs"
          options={checkboxDoughsOptions}
          multiple={false}
        />
        <button type="submit">Continuar</button>
      </Form>
    </div>
  );
};

export default Dough;
