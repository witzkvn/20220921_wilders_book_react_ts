<<<<<<< HEAD
export default interface IAddWilderForm {
  setNeedUpdateAfterCreation: (value: boolean) => void;
=======
import React from "react";
import IWilderFromDb from "../wilder/IWilderFromDb";

export default interface IAddWilderForm {
    wilderToEdit: IWilderFromDb | null;
    setWilderToEdit: React.Dispatch<React.SetStateAction<IWilderFromDb | null>>;
    setNeedUpdateAfterCreation: (value: boolean) => void;
>>>>>>> 52e607e35d47fa7744fcaacf12c68f346e859479
}
