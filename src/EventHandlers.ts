/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  SablierV2LockupLinearContract_Approval_loader,
  SablierV2LockupLinearContract_Approval_handler,
  SablierV2LockupLinearContract_ApprovalForAll_loader,
  SablierV2LockupLinearContract_ApprovalForAll_handler,
  SablierV2LockupLinearContract_BatchMetadataUpdate_loader,
  SablierV2LockupLinearContract_BatchMetadataUpdate_handler,
  SablierV2LockupLinearContract_CancelLockupStream_loader,
  SablierV2LockupLinearContract_CancelLockupStream_handler,
  SablierV2LockupLinearContract_ClaimProtocolRevenues_loader,
  SablierV2LockupLinearContract_ClaimProtocolRevenues_handler,
  // SablierV2LockupLinearContract_CreateLockupLinearStream_loader,
  // SablierV2LockupLinearContract_CreateLockupLinearStream_handler,
  SablierV2LockupLinearContract_MetadataUpdate_loader,
  SablierV2LockupLinearContract_MetadataUpdate_handler,
  SablierV2LockupLinearContract_RenounceLockupStream_loader,
  SablierV2LockupLinearContract_RenounceLockupStream_handler,
  SablierV2LockupLinearContract_SetComptroller_loader,
  SablierV2LockupLinearContract_SetComptroller_handler,
  SablierV2LockupLinearContract_SetNFTDescriptor_loader,
  SablierV2LockupLinearContract_SetNFTDescriptor_handler,
  SablierV2LockupLinearContract_Transfer_loader,
  SablierV2LockupLinearContract_Transfer_handler,
  SablierV2LockupLinearContract_TransferAdmin_loader,
  SablierV2LockupLinearContract_TransferAdmin_handler,
  SablierV2LockupLinearContract_WithdrawFromLockupStream_loader,
  SablierV2LockupLinearContract_WithdrawFromLockupStream_handler,
} from "../generated/src/Handlers.gen";

import {
  ApprovalEntity,
  ApprovalForAllEntity,
  BatchMetadataUpdateEntity,
  CancelLockupStreamEntity,
  ClaimProtocolRevenuesEntity,
  // CreateLockupLinearStreamEntity,
  MetadataUpdateEntity,
  RenounceLockupStreamEntity,
  SetComptrollerEntity,
  SetNFTDescriptorEntity,
  TransferEntity,
  TransferAdminEntity,
  WithdrawFromLockupStreamEntity,
  EventsSummaryEntity,
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  approvalsCount: BigInt(0),
  approvalForAllsCount: BigInt(0),
  batchMetadataUpdatesCount: BigInt(0),
  cancelLockupStreamsCount: BigInt(0),
  claimProtocolRevenuessCount: BigInt(0),
  // createLockupLinearStreamsCount: BigInt(0),
  metadataUpdatesCount: BigInt(0),
  renounceLockupStreamsCount: BigInt(0),
  setComptrollersCount: BigInt(0),
  setNFTDescriptorsCount: BigInt(0),
  transfersCount: BigInt(0),
  transferAdminsCount: BigInt(0),
  withdrawFromLockupStreamsCount: BigInt(0),
};

SablierV2LockupLinearContract_Approval_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SablierV2LockupLinearContract_Approval_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    approvalsCount: currentSummaryEntity.approvalsCount + BigInt(1),
  };

  let approvalEntity: ApprovalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    approved: event.params.approved,
    tokenId: event.params.tokenId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Approval.set(approvalEntity);
});

SablierV2LockupLinearContract_ApprovalForAll_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SablierV2LockupLinearContract_ApprovalForAll_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    approvalForAllsCount: currentSummaryEntity.approvalForAllsCount + BigInt(1),
  };

  let approvalForAllEntity: ApprovalForAllEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    owner: event.params.owner,
    operator: event.params.operator,
    approved: event.params.approved,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.ApprovalForAll.set(approvalForAllEntity);
});

SablierV2LockupLinearContract_BatchMetadataUpdate_loader(
  ({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

SablierV2LockupLinearContract_BatchMetadataUpdate_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      batchMetadataUpdatesCount:
        currentSummaryEntity.batchMetadataUpdatesCount + BigInt(1),
    };

    let batchMetadataUpdateEntity: BatchMetadataUpdateEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      _fromTokenId: event.params._fromTokenId,
      _toTokenId: event.params._toTokenId,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.BatchMetadataUpdate.set(batchMetadataUpdateEntity);
  }
);

SablierV2LockupLinearContract_CancelLockupStream_loader(
  ({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

SablierV2LockupLinearContract_CancelLockupStream_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      cancelLockupStreamsCount:
        currentSummaryEntity.cancelLockupStreamsCount + BigInt(1),
    };

    let cancelLockupStreamEntity: CancelLockupStreamEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      streamId: event.params.streamId,
      sender: event.params.sender,
      recipient: event.params.recipient,
      senderAmount: event.params.senderAmount,
      recipientAmount: event.params.recipientAmount,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.CancelLockupStream.set(cancelLockupStreamEntity);
  }
);

SablierV2LockupLinearContract_ClaimProtocolRevenues_loader(
  ({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

SablierV2LockupLinearContract_ClaimProtocolRevenues_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      claimProtocolRevenuessCount:
        currentSummaryEntity.claimProtocolRevenuessCount + BigInt(1),
    };

    let claimProtocolRevenuesEntity: ClaimProtocolRevenuesEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      admin: event.params.admin,
      asset: event.params.asset,
      protocolRevenues: event.params.protocolRevenues,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.ClaimProtocolRevenues.set(claimProtocolRevenuesEntity);
  }
);

// SablierV2LockupLinearContract_CreateLockupLinearStream_loader(
//   ({ event, context }) => {
//     context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
//   }
// );

// SablierV2LockupLinearContract_CreateLockupLinearStream_handler(
//   ({ event, context }) => {
//     let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

//     let currentSummaryEntity: EventsSummaryEntity =
//       summary ?? INITIAL_EVENTS_SUMMARY;

//     let nextSummaryEntity = {
//       ...currentSummaryEntity,
//       createLockupLinearStreamsCount:
//         currentSummaryEntity.createLockupLinearStreamsCount + BigInt(1),
//     };

//     let createLockupLinearStreamEntity: CreateLockupLinearStreamEntity = {
//       id: event.transactionHash + event.logIndex.toString(),
//       streamId: event.params.streamId,
//       funder: event.params.funder,
//       sender: event.params.sender,
//       recipient: event.params.recipient,
//       amounts: event.params.amounts,
//       asset: event.params.asset,
//       cancelable: event.params.cancelable,
//       range: event.params.range,
//       broker: event.params.broker,
//       eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
//     };

//     context.EventsSummary.set(nextSummaryEntity);
//     context.CreateLockupLinearStream.set(createLockupLinearStreamEntity);
//   }
// );

SablierV2LockupLinearContract_MetadataUpdate_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SablierV2LockupLinearContract_MetadataUpdate_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    metadataUpdatesCount: currentSummaryEntity.metadataUpdatesCount + BigInt(1),
  };

  let metadataUpdateEntity: MetadataUpdateEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    _tokenId: event.params._tokenId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.MetadataUpdate.set(metadataUpdateEntity);
});

SablierV2LockupLinearContract_RenounceLockupStream_loader(
  ({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

SablierV2LockupLinearContract_RenounceLockupStream_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      renounceLockupStreamsCount:
        currentSummaryEntity.renounceLockupStreamsCount + BigInt(1),
    };

    let renounceLockupStreamEntity: RenounceLockupStreamEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      streamId: event.params.streamId,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.RenounceLockupStream.set(renounceLockupStreamEntity);
  }
);

SablierV2LockupLinearContract_SetComptroller_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SablierV2LockupLinearContract_SetComptroller_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    setComptrollersCount: currentSummaryEntity.setComptrollersCount + BigInt(1),
  };

  let setComptrollerEntity: SetComptrollerEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    admin: event.params.admin,
    oldComptroller: event.params.oldComptroller,
    newComptroller: event.params.newComptroller,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.SetComptroller.set(setComptrollerEntity);
});

SablierV2LockupLinearContract_SetNFTDescriptor_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SablierV2LockupLinearContract_SetNFTDescriptor_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    setNFTDescriptorsCount:
      currentSummaryEntity.setNFTDescriptorsCount + BigInt(1),
  };

  let setNFTDescriptorEntity: SetNFTDescriptorEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    admin: event.params.admin,
    oldNFTDescriptor: event.params.oldNFTDescriptor,
    newNFTDescriptor: event.params.newNFTDescriptor,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.SetNFTDescriptor.set(setNFTDescriptorEntity);
});

SablierV2LockupLinearContract_Transfer_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SablierV2LockupLinearContract_Transfer_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    transfersCount: currentSummaryEntity.transfersCount + BigInt(1),
  };

  let transferEntity: TransferEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.Transfer.set(transferEntity);
});

SablierV2LockupLinearContract_TransferAdmin_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

SablierV2LockupLinearContract_TransferAdmin_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    transferAdminsCount: currentSummaryEntity.transferAdminsCount + BigInt(1),
  };

  let transferAdminEntity: TransferAdminEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    oldAdmin: event.params.oldAdmin,
    newAdmin: event.params.newAdmin,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.TransferAdmin.set(transferAdminEntity);
});

SablierV2LockupLinearContract_WithdrawFromLockupStream_loader(
  ({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

SablierV2LockupLinearContract_WithdrawFromLockupStream_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      withdrawFromLockupStreamsCount:
        currentSummaryEntity.withdrawFromLockupStreamsCount + BigInt(1),
    };

    let withdrawFromLockupStreamEntity: WithdrawFromLockupStreamEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      streamId: event.params.streamId,
      to: event.params.to,
      amount: event.params.amount,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.WithdrawFromLockupStream.set(withdrawFromLockupStreamEntity);
  }
);
