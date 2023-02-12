import { AuthorizationStatus } from '../../constans';
import {useAppSelector} from "../../hooks";
import {getAuthorizationStatus, getIsAdmin} from "../../store/user/selectors";
import PageNotFound from "../../pages/page-not-found/page-not-found";

type PrivateRouteProps = {
  children: JSX.Element;
}
export default function PrivateRouteAdmin(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAdmin = useAppSelector(getIsAdmin);
  return (
    (authorizationStatus === AuthorizationStatus.Auth && isAdmin)
      ? children
      : <PageNotFound/>
  );
}
