import { FC, useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import FormButton from "@/shared/ui/Form/FormButton";
import useRights from "@/shared/hooks/useRights";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert } from "@/app/store/main/main";
import useTranslate from "@/shared/hooks/useTranslate";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import { IRole } from "@ap/shared/dist/types";
import { getErrorText, ROUTES } from "@ap/shared/dist/libs";
import RoleTable from "@/entities/role/RoleTable";
import rolesApi from "@/entities/role/api";
import { IEntityList } from "@/shared/lib/types";

const RoleList: FC<IEntityList<IRole>> = ({
  initialRows,
  initialMeta,
  onMetaUpdate,
}) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const t = useTranslate();
  const rights = useRights(ROUTES.api.roles);
  const [getList, getListReq] = rolesApi.useLazyGetListQuery();
  const [destroy, destroyReq] = rolesApi.useDeleteMutation();
  const [selectedRows, setSelectedRows] = useState<IRole["id"][]>([]);
  const [rows, setRows] = useState(initialRows);
  const meta = useRef(initialMeta);

  useEffect(() => {
    if (!rows) {
      getList({
        reqPage: meta.current?.page,
        reqLimit: meta.current?.limit,
        reqCount: true,
      });
    }
  }, [rows, getList]);

  useEffect(() => {
    if (getListReq.data) {
      setRows(getListReq.data.rows);

      if (getListReq.data.meta) {
        meta.current = {
          ...getListReq.data.meta,
          total: getListReq.data.meta.total ?? meta.current?.total,
        };
        onMetaUpdate?.(meta.current);
      }
    }
  }, [getListReq.data, onMetaUpdate]);

  useEffect(() => {
    if (getListReq.error) {
      dispatch(
        addAlert({
          type: "error",
          text: getErrorText(getListReq.error, lRef.current),
        })
      );
    }
  }, [dispatch, getListReq.error, lRef]);

  useEffect(() => {
    if (destroyReq.isSuccess) {
      getList({
        reqPage: meta.current?.page,
        reqLimit: meta.current?.limit,
        reqCount: true,
      });
    }
  }, [destroyReq.isSuccess, getList]);

  useEffect(() => {
    if (destroyReq.error) {
      dispatch(
        addAlert({
          type: "error",
          text: getErrorText(destroyReq.error, lRef.current),
        })
      );
    }
  }, [dispatch, destroyReq.error, lRef]);

  return (
    <>
      <FormButton
        color="primary"
        startIcon={<AddIcon />}
        disabled={!rights.creating}
        href={ROUTES.ui.newRole}
      >
        {t.create}
      </FormButton>
      <FormButton
        color="error"
        startIcon={<DeleteIcon />}
        disabled={!rights.deleting || selectedRows.length === 0}
        loading={destroyReq.isLoading}
        onClick={() => destroy({ items: selectedRows })}
      >
        {t.delete}
      </FormButton>
      <RoleTable
        initialState={{
          pagination: {
            paginationModel: {
              page: (meta.current?.page || 1) - 1,
              pageSize: meta.current?.limit ?? 25,
            },
          },
        }}
        paginationMode="server"
        rows={rows}
        rowCount={meta.current?.total ?? rows?.length}
        loading={getListReq.isLoading || destroyReq.isLoading}
        onRowSelectionModelChange={(rowSelectionModel) =>
          setSelectedRows(
            rowSelectionModel.ids
              .values()
              .toArray()
              .map((value) => value.toString())
          )
        }
        onPaginationModelChange={(model) =>
          getList({ reqPage: model.page + 1, reqLimit: model.pageSize })
        }
      />
    </>
  );
};
export default RoleList;
