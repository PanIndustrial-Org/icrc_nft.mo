import ICRC7 "mo:icrc7-mo";
import ICRC30 "mo:icrc30-mo";
import ICRC3 "mo:icrc3-mo";

module {
  public type InitArgs = {
    icrc7_args : ICRC7.InitArgs;
    icrc30_args : ICRC30.InitArgs;
    icrc3_args : ICRC3.InitArgs;
  };
};
