//
//  ServerConnectionBridge.m
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-03-15.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(ServerController, NSObject)

RCT_EXTERN_METHOD(connectToServer:(NSString *)str)

@end
