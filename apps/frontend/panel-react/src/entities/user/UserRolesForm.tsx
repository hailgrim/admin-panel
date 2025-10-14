import { FC, FormEvent, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";

import FormBase from "@/shared/ui/Form/FormBase";
import FormButton from "@/shared/ui/Form/FormButton";
import useTranslate from "@/shared/hooks/useTranslate";
import FormCheckbox from "@/shared/ui/Form/FormCheckbox";
import { IRole, IUser, IUsersRoles } from "@ap/shared/dist/types";
import { IEntityFormUpdate } from "@/shared/lib/types";

const UserRolesForm: FC<
  {
    user: IUser;
    roles: IRole[];
  } & IEntityFormUpdate<IUsersRoles[]>
> = ({ user, roles, onUpdate, updateDisabled, updateLoading }) => {
  const t = useTranslate();
  const [updatedRoles, setUpdatedRoles] = useState<IUsersRoles[]>(
    user.roles?.map((value) => ({ roleId: value.id, userId: user.id })) ?? []
  );

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdate?.(updatedRoles);
  };

  const updateRoles = (newRole: IUsersRoles) => {
    let find = false;

    const filtered = updatedRoles.filter((value) => {
      if (newRole.userId === value.userId && newRole.roleId === value.roleId) {
        find = true;
        return false;
      } else {
        return true;
      }
    });

    if (!find) {
      filtered.push(newRole);
    }

    setUpdatedRoles(filtered);
  };

  return (
    <FormBase onSubmit={submitHandler}>
      {roles.map((role) => (
        <FormCheckbox
          key={role.id}
          labelProps={{ label: role.name, sx: { display: "inline-flex" } }}
          name="role[]"
          value="allowed"
          checked={updatedRoles.some((value) => value.roleId === role.id)}
          onChange={() => updateRoles({ roleId: role.id, userId: user.id })}
          disabled={role.admin}
        />
      ))}
      <br />
      <FormButton
        type="submit"
        color="success"
        startIcon={<SaveIcon />}
        disabled={updateDisabled}
        loading={updateLoading}
      >
        {t.update}
      </FormButton>
    </FormBase>
  );
};
export default UserRolesForm;
