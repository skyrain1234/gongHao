## [Unreleased]

### ✨ Added
- （尚未新增）

### ♻️ Changed
- （尚未修改）

### 🐛 Fixed
- （尚未修正）

---

## [feature/news] - 2025-08-20

### ♻️ Changed
- **components**: 優化 `Pagination.vue` 分頁按鈕元件  
  - 新增 **網址參數 `?page` 支援**，可保留當前頁面狀態  

- **components**: 調整 `ProductList.vue` 產品列表  
  - 整合 **`Pagination.vue` 分頁按鈕**，提升程式一致性  
  - 優化 **註解區塊**，使程式碼結構更清晰

- **整合build/reference_2**
---

## [feature/news] - 2025-08-19  

### ✨ Added  
- **components**: 新增 `Pagination.vue` 分頁按鈕元件  
  - **使用方式**：  
    ```vue
    <Pagination
      v-model:page="currentPage"
      :total-pages="totalPages"
      :window-size="3"
      :show-jump="true"
      :show-info="true"
      :limit="newsLimit"
      :total-items="newsList.length"
    />
    ``` 
    ```js
    // 載入 components/Pagination
    import Pagination from "@/components/guest/common/pagination/pagination.vue";
    ```
  - **參數說明**：  
    - `currentPage`：當前頁碼(必填)
    - `total-pages`：總頁數(必填)  
    - `window-size`：要顯示的頁碼數量（避免分頁過多，多餘的頁碼會以「...」代替）  
    - `show-jump`：是否顯示「跳頁」按鈕  
    - `show-info`：是否顯示當前分頁資訊（需要傳入 `limit` 與 `total-items`）  
      - `limit`：每頁資料筆數上限  
      - `total-items`：總資料筆數  

- **api/tools**: 新增 `scrollOnPageChange`，當頁碼變動時可自動捲動至指定位置  
  - **使用方式**：  
    ```js
    // 載入 api/useScrollOnPageChange
    import { useScrollOnPageChange } from "@/api/main/tools/scrollOnPageChange";

    // 分頁變更後，自動捲到頂部或指定元素
    useScrollOnPageChange(currentPage, null);
    ```
  - **參數說明**：  
    - 第一個參數：目前的分頁變數（例如 `currentPage`）  
    - 第二個參數：可傳入 `ref` 來指定滾動目標  
      - 範例：  
        ```vue
        <div ref="xxx">...</div>
        ```
        ```js
        const xxx = ref('');
        ```
