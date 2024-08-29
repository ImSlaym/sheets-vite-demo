import "./style.css";

import { BooleanNumber, IPermissionService, LocaleType, SheetTypes, Univer, UniverInstanceType } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { RangeProtectionPermissionEditPoint, RangeProtectionPermissionViewPoint, UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverUIPlugin } from "@univerjs/ui";

/**
 * The ability to import locales from virtual modules and automatically import styles is provided by Univer Plugins. For more details, please refer to: https://univer.ai/guides/sheet/advanced/univer-plugins.
 * If you encounter issues while using the plugin or have difficulty understanding how to use it, please disable Univer Plugins and manually import the language packs and styles.
 * 
 * 【从虚拟模块导入语言包】以及【自动导入样式】是由 Univer Plugins 提供的能力，详情参考：https://univer.ai/zh-CN/guides/sheet/advanced/univer-plugins
 * 如果您在使用该插件的时候出现了问题，或者无法理解如何使用，请禁用 Univer Plugins，并手动导入语言包和样式
 */
import { zhCN, enUS } from 'univer:locales'

const univer = new Univer({
  theme: defaultTheme,
  locale: LocaleType.EN_US,
  locales: {
    [LocaleType.ZH_CN]: zhCN,
    [LocaleType.EN_US]: enUS,
  },
});

univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverFormulaEnginePlugin);

univer.registerPlugin(UniverUIPlugin, {
  container: 'app',
});

univer.registerPlugin(UniverDocsPlugin, {
  hasScroll: false,
});
univer.registerPlugin(UniverDocsUIPlugin);


univer.registerPlugin(UniverSheetsPlugin);
univer.registerPlugin(UniverSheetsUIPlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);

// create univer sheet instance
univer.createUnit(UniverInstanceType.UNIVER_SHEET, {
    id: 'Passagers_worksheet',
    locale: LocaleType.EN_US,
    name: 'Passagers_worksheet',
    appVersion: '',
    styles: {
        'style_id_1': {
        vt: 2, // Center alignment,
        ht: 2 // Left alignment
        },
        'style_id_2': {
        vt: 2, // Center alignment,
        ht: 2, // Left alignment
        n: {pattern: "yyyy/MM/dd"}
        }
    },
    sheets: {
        'Passagers_sheet': {
        type: SheetTypes.GRID,
        id: 'Passagers_sheet',
        cellData: {
            0: {
                0: { v: "Try to Cut and paste me I will lose my value", s: "style_id_1" },
            },
            
        },
        
        name: 'Passagers_sheet',
        hidden: BooleanNumber.FALSE,
        rowCount: 1000,
        columnCount: 14,
        tabColor: '',
        zoomRatio: 1,
        scrollTop: 0,
        scrollLeft: 0,
        freeze: {
            xSplit: 1,
            ySplit: 1,
            startRow: 1,
            startColumn: 0,
        },
        defaultColumnWidth: 120,
        defaultRowHeight: 30,
        status: 1,
        showGridlines: 1,
        hideRow: [],
        hideColumn: [],
        rowHeader: {
            width: 46,
            hidden: BooleanNumber.FALSE,
        },
        columnHeader: {
            height: 20,
            hidden: BooleanNumber.FALSE,
        },
        rightToLeft: BooleanNumber.FALSE,
        }
    },
    resources: [
        
        {
            name: 'SHEET_RANGE_PROTECTION_PLUGIN',
            data: JSON.stringify({
            "Passagers_sheet":[
                {name:"Protection(cellules à ne pas toucher)", unitId:"Passagers_worksheet",subUnitId:"Passagers_sheet",permissionId:"zfhyvc141ujte",unitType:3,id:"TrB1",ranges: [{startRow:0,startColumn:0,endRow:0,endColumn:0,rangeType:0}],description:"Ne pas toucher !"},
            ]
            }),
        }
    ]
    
    
}

);
setTimeout(() => {
    let injector = univer.__getInjector();
    let permissionService = injector.get(IPermissionService);
    
    // I'm trying to let my user view but not edit this sheet 
    permissionService.updatePermissionPoint(
      new RangeProtectionPermissionEditPoint("Passagers_worksheet","Passagers_sheet","zfhyvc141ujte").id,
      false
    );
    permissionService.updatePermissionPoint(
        new RangeProtectionPermissionViewPoint("Passagers_worksheet","Passagers_sheet","zfhyvc141ujte").id,
        true
    );
}, 1000);