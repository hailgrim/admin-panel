import { FC, FormEvent, useEffect, useRef } from "react";
import { UAParser } from "ua-parser-js";
import DeleteIcon from "@mui/icons-material/Delete";
import ComputerIcon from "@mui/icons-material/Computer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import {
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  styled,
  Typography,
} from "@mui/material";

import FormBase from "@/shared/ui/form/FormBase";
import { useAppDispatch } from "@/app/store/hooks";
import { addAlert, setProfile } from "@/app/store/main/main";
import theme from "@/shared/lib/theme";
import useRights from "@/shared/hooks/useRights";
import useTranslate from "@/shared/hooks/useTranslate";
import useLanguageRef from "@/shared/hooks/useLanguageRef";
import useTranslateRef from "@/shared/hooks/useTranslateRef";
import { TSessionExternal } from "@ap/shared/dist/types";
import { getDateString, getErrorText, ROUTES } from "@ap/shared/dist/libs";
import profileApi from "@/entities/profile/api";

const SessionForm: FC<{ session: TSessionExternal; onDelete?: () => void }> = ({
  session,
  onDelete,
}) => {
  const dispatch = useAppDispatch();
  const lRef = useLanguageRef();
  const tRef = useTranslateRef();
  const t = useTranslate();
  const rights = useRights(ROUTES.api.profile);
  const userAgent = useRef(new UAParser(session.userAgent).getResult());
  const [remove, removeReq] = profileApi.useDeleteSessionsMutation();

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    remove({ items: [session.id] });
  };

  useEffect(() => {
    if (removeReq.error) {
      dispatch(
        addAlert({
          type: "error",
          text: getErrorText(removeReq.error, lRef.current),
        })
      );
    }
  }, [dispatch, removeReq.error, lRef]);

  useEffect(() => {
    if (removeReq.isSuccess) {
      dispatch(addAlert({ type: "success", text: tRef.current.success }));
      onDelete?.();

      if (session.current) {
        dispatch(setProfile(null));
      }
    }
  }, [removeReq.isSuccess, dispatch, session, tRef, onDelete]);

  return (
    <FormBase onSubmit={submitHandler}>
      <Session>
        <SessionContent>
          {userAgent.current.device.vendor ? (
            <>
              <SmartphoneIcon sx={{ mr: 1 }} />
              <Typography component="span" variant="body2">
                {userAgent.current.device.vendor}{" "}
                {userAgent.current.device.model}
                {","}&nbsp;
              </Typography>
            </>
          ) : (
            <>
              <ComputerIcon sx={{ mr: 1 }} />
              <Typography component="span" variant="body2">
                {userAgent.current.os.name} {userAgent.current.os.version}
                {","}&nbsp;
              </Typography>
            </>
          )}
          <Typography component="span" variant="body2">
            {userAgent.current.browser.name} {userAgent.current.browser.version}
            {","}&nbsp;
          </Typography>
          <Typography component="span" variant="body2" sx={{ opacity: 0.8 }}>
            {session.ip}
            {","}&nbsp;
          </Typography>
          <Typography
            component="span"
            variant="body2"
            sx={{ mr: 1, opacity: 0.6 }}
          >
            {getDateString(session.updatedAt)}
          </Typography>
          {session.current && (
            <Chip
              label={t.current}
              color="success"
              variant="outlined"
              size="small"
            />
          )}
        </SessionContent>
        <CardActions sx={{ pr: 2 }}>
          <IconButton
            edge="end"
            color="error"
            aria-label="sign out"
            title={t.signOut}
            disabled={
              !rights.updating || removeReq.isLoading || removeReq.isSuccess
            }
            type="submit"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Session>
    </FormBase>
  );
};
export default SessionForm;

const Session = styled(Card)`
  display: flex;
  flex-direction: row;
  margin-bottom: ${theme.spacing(1)};
`;

const SessionContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
