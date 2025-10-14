import React, { useMemo } from "react";
import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";

import useTranslate from "@/shared/hooks/useTranslate";
import FormCheckbox from "@/shared/ui/Form/FormCheckbox";
import { IResource, IRights } from "@ap/shared/dist/types";

const ResourceRights: React.FC<{
  roleId: string;
  resource: IResource;
  rights?: IRights;
  onUpdate: (newRights: IRights) => void;
}> = ({ roleId, resource, rights, onUpdate }) => {
  const t = useTranslate();
  const newRights = useMemo(() => {
    return rights ?? {
      roleId,
      resourceId: resource.id,
      creating: false,
      reading: false,
      updating: false,
      deleting: false,
    };
  }, [rights, roleId, resource]);

  return (
    <FormControl sx={{ my: 1, mr: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{resource.name}</FormLabel>
      <FormGroup>
        <FormCheckbox
          labelProps={{ label: t.create }}
          name="create[]"
          value="create"
          checked={rights?.creating || false}
          onChange={() =>
            onUpdate({ ...newRights, creating: !newRights.creating })
          }
        />
        <FormCheckbox
          labelProps={{ label: t.read }}
          name="read[]"
          value="read"
          checked={rights?.reading || false}
          onChange={() =>
            onUpdate({ ...newRights, reading: !newRights.reading })
          }
        />
        <FormCheckbox
          labelProps={{ label: t.update }}
          name="update[]"
          value="update"
          checked={rights?.updating || false}
          onChange={() =>
            onUpdate({ ...newRights, updating: !newRights.updating })
          }
        />
        <FormCheckbox
          labelProps={{ label: t.delete }}
          name="delete[]"
          value="delete"
          checked={rights?.deleting || false}
          onChange={() =>
            onUpdate({ ...newRights, deleting: !newRights.deleting })
          }
        />
      </FormGroup>
      <FormHelperText sx={{ maxWidth: 300 }}>
        {resource.description}
      </FormHelperText>
    </FormControl>
  );
};
export default ResourceRights;
