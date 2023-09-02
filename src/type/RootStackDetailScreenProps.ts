import type { StackScreenProps } from "@react-navigation/stack";
import { type RouteNameMain } from "../navigation/const";
import { RootStackParamList } from "./navigation";


export type RootStackDetailScreenProps = StackScreenProps<
  RootStackParamList, RouteNameMain.modalDetail
>;
