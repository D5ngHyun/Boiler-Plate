import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../_actions/user_action";

export default function Auth(SpecificComponent, option, adminRoute = null) {
  /**
   * option
   * ---------------
   * null => 아무나 출입이 가능한 페이지
   * true => 로그인한 유저만 출입이 가능한 페이지
   * false => 로그인한 유저는 출입이 불가능한 페이지
   */

  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(auth()).then((res) => {
        // 로그인하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          // adminRoute True인데 어드민이 아닌데 들어가려고하면 막아줘야함
          if (adminRoute && !res.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
