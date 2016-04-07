//
//  TestKeyData.swift
//  BioAuthiOS
//
//  Created by Bruce Li on 2016-04-07.
//  Copyright © 2016 Facebook. All rights reserved.
//

import XCTest
@testable import BioAuthiOS

class TestKeyData: XCTestCase {
  
  let keyData = KeyData(appName: "BioAuth", timestamp: "10", keyData: "a")

    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }


  func testAppName() {
    XCTAssertEqual(keyData.appName, "BioAuth")
  }
  
  func testTimestamp() {
    XCTAssertEqual(keyData.timestamp, "10")
  }
  
  func testKeyData() {
    XCTAssertEqual(keyData.keyData, "a")
  }
  
  func testAppNameFail() {
    XCTAssertNotEqual(keyData.appName, "bioauth")
  }
  
  func testTimestampFail() {
    XCTAssertNotEqual(keyData.timestamp, "9")
  }
  
  func testKeyDataFail() {
    XCTAssertNotEqual(keyData.appName, "b")
  }
 

}
