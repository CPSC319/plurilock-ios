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
  
  
  @objc func testSwiftMethod(paramOne: String, paramTwo: NSDictionary) -> Void {
    print("param one: ", paramOne)
    print("param two: ", paramTwo)
  }
}
