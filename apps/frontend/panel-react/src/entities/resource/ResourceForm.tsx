import { FC, FormEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

import FormBase from "@/shared/ui/Form/FormBase";
import FormField from "@/shared/ui/Form/FormField";
import FormButton from "@/shared/ui/Form/FormButton";
import FormCheckbox from "@/shared/ui/Form/FormCheckbox";
import useTranslate from "@/shared/hooks/useTranslate";
import {
  IResource,
  TResourceCreate,
  TResourceUpdate,
} from "@ap/shared/dist/types";
import { IEntityForm } from "@/shared/lib/types";

const ResourceForm: FC<
  IEntityForm<IResource, TResourceCreate, TResourceUpdate>
> = ({
  initialData,
  onCreate,
  createDisabled,
  createLoading,
  onUpdate,
  updateDisabled,
  updateLoading,
  onDelete,
  deleteDisabled,
  deleteLoading,
}) => {
  const t = useTranslate();
  const [data, setData] = useState<IResource>(
    initialData ?? {
      id: "",
      name: "",
      path: "",
      description: "",
      default: false,
      enabled: false,
    }
  );

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate?.({
      name: data.name,
      path: data.path,
      description: data.description,
      enabled: data.enabled,
    });
    onUpdate?.({
      name: data.name,
      path: data.path,
      description: data.description,
      enabled: data.enabled,
    });
  };

  return (
    <FormBase onSubmit={submitHandler}>
      <FormField
        required
        name="name"
        label={t.name}
        value={data.name}
        onChange={(event) => setData({ ...data, name: event.target.value })}
      />
      <FormField
        required
        name="path"
        label={t.path}
        value={data.path}
        onChange={(event) => setData({ ...data, path: event.target.value })}
      />
      <FormField
        name="description"
        label={t.description}
        value={data.description}
        onChange={(event) =>
          setData({ ...data, description: event.target.value })
        }
      />
      <FormCheckbox
        labelProps={{ label: t.enabled }}
        name="enabled"
        value="enabled"
        checked={data.enabled}
        onChange={() => setData({ ...data, enabled: !data.enabled })}
      />
      {onCreate && (
        <FormButton
          type="submit"
          color="primary"
          startIcon={<AddIcon />}
          disabled={createDisabled}
          loading={createLoading}
        >
          {t.create}
        </FormButton>
      )}
      {onUpdate && (
        <FormButton
          type="submit"
          color="success"
          startIcon={<SaveIcon />}
          disabled={updateDisabled}
          loading={updateLoading}
        >
          {t.update}
        </FormButton>
      )}
      {onDelete && (
        <FormButton
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onDelete}
          disabled={deleteDisabled}
          loading={deleteLoading}
        >
          {t.delete}
        </FormButton>
      )}
    </FormBase>
  );
};
export default ResourceForm;
