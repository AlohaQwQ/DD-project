import React, { useState, useEffect } from "react";
import { Image, Flex, Progress } from 'antd';
import Link from 'next/link';

let inventoryData = {
    total: 1000,
    sold: 500
}
// useEffect(() => {
//   (async () => {
//     if (checkEligibility) {
//       if (!candyMachineId) {
//         console.error("No candy machine in .env!Add your candy machine address to the .env file!");
//         // if (!toast.isActive("no-cm")) {
//         //   toast({
//         //     id: "no-cm",
//         //     title: "No candy machine in .env!",
//         //     description: "Add your candy machine address to the .env file!",
//         //     status: "error",
//         //     duration: 999999,
//         //     isClosable: true,
//         //   });
//         // }
//         return;
//       }

//       let candyMachine;
//       try {
//         candyMachine = await fetchCandyMachine(umi, publicKey(candyMachineId));
//         //verify CM Version
//         if (candyMachine.version != AccountVersion.V2) {
//           console.error("Wrong candy machine account version!Please use latest sugar to create your candy machine. Need Account Version 2!");
//           // toast({
//           //   id: "wrong-account-version",
//           //   title: "Wrong candy machine account version!",
//           //   description: "Please use latest sugar to create your candy machine. Need Account Version 2!",
//           //   status: "error",
//           //   duration: 999999,
//           //   isClosable: true,
//           // });
//           return;
//         }
//       } catch (e) {
//         console.error("The CM from .env is invalid!Are you using the correct environment?" + e);
//         // toast({
//         //   id: "no-cm-found",
//         //   title: "The CM from .env is invalid",
//         //   description: "Are you using the correct environment?",
//         //   status: "error",
//         //   duration: 999999,
//         //   isClosable: true,
//         // });
//       }
//       setCandyMachine(candyMachine);
//       if (!candyMachine) {
//         return;
//       }
//       let candyGuard;
//       try {
//         candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
//       } catch (e) {
//         console.error("No Candy Guard found!Do you have one assigned?" + e);
//         // toast({
//         //   id: "no-guard-found",
//         //   title: "No Candy Guard found!",
//         //   description: "Do you have one assigned?",
//         //   status: "error",
//         //   duration: 999999,
//         //   isClosable: true,
//         // });
//       }
//       if (!candyGuard) {
//         return;
//       }
//       setCandyGuard(candyGuard);
//       if (firstRun) {
//         setfirstRun(false)
//       }
//     }
//   })();
// }, [umi, checkEligibility, candyMachineId, firstRun, setfirstRun, toast]);
const InventoryComp = () => {
	return (
        <div className="inventory-wrap">
            <div className="inventory-bgimg"></div>
            <div className="inventory-num">{inventoryData.total - inventoryData.sold}/{inventoryData.total}</div>
            <Flex gap="small" vertical>
                <Progress 
                    percent={((Number(inventoryData.sold))/Number(inventoryData.total)) * 100} 
                    strokeColor="#ff0000" 
                    size={[1394, 22]}
                    showInfo={false}
                />
            </Flex>
        </div>
	);
};

export default InventoryComp;