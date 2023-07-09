import React, { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

type State = {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
};

type Action =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: string }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

type Dispatch = (action: Action) => void;

export const MaterialTailwind = React.createContext<[State, Dispatch] | null>(
  null
);
MaterialTailwind.displayName = "MaterialTailwindContext";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

type MaterialTailwindControllerProviderProps = {
  children: React.ReactNode;
};

function MaterialTailwindControllerProvider({
  children,
}: MaterialTailwindControllerProviderProps) {
  const initialState: State = {
    openSidenav: false,
    sidenavColor: "blue",
    sidenavType: "dark",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo<[State, Dispatch]>(() => [controller, dispatch], [
    controller,
    dispatch,
  ]);

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

function useMaterialTailwindController(): [State, Dispatch] {
  const context = useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {
  MaterialTailwindControllerProvider,
  useMaterialTailwindController,
};

export const setOpenSidenav = (dispatch: Dispatch, value: boolean) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch: Dispatch, value: string) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch: Dispatch, value: string) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch: Dispatch, value: boolean) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch: Dispatch, value: boolean) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch: Dispatch, value: boolean) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });
