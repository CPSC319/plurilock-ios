//
//  GestureLogger.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-02-26.
//  Copyright © 2016 Facebook. All rights reserved.
//

import UIKit

@objc(GestureLogger)
class GestureLogger: NSObject {
  
  
  @objc func retrievePanGestureData(gestureType: String, timestamp: String, gestureData: NSDictionary) -> Void {
    print("Gesture: ", gestureType)
    print("Timestamp: ", timestamp)
    print("Gesture Data: ", gestureData)
  }
}
