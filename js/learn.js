/* ============================================================
   LEARN.JS — Algorithm visualizer engine (hardcoded demo data)
   ============================================================ */

/* ── ALGORITHM DATA ── */
const ALGOS = {

  binary_search: {
    title: 'BINARY SEARCH',
    target: 'TARGET: 23',
    arrData: [2, 5, 8, 12, 16, 23, 38, 45],

    concept: {
      what:   'Binary Search finds a target in a sorted array by repeatedly halving the search space. It picks the middle element and eliminates half the remaining candidates based on the comparison result.',
      when:   'Use when the array is sorted. Never use on unsorted data — results will be wrong.',
      tags:   [{ label:'SORTED INPUT', color:'green' }, { label:'DIVIDE & CONQUER', color:'blue' }, { label:'ITERATIVE', color:'purple' }]
    },

    code: [
      { ln:1,  code:'<span class="kw">def</span> <span class="fn2">binary_search</span>(arr, target):' },
      { ln:2,  code:'&nbsp;&nbsp;low, high = <span class="nm">0</span>, len(arr) - <span class="nm">1</span>' },
      { ln:3,  code:'&nbsp;&nbsp;<span class="kw">while</span> low &lt;= high:' },
      { ln:4,  code:'&nbsp;&nbsp;&nbsp;&nbsp;mid = (low + high) // <span class="nm">2</span>' },
      { ln:5,  code:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> arr[mid] == target:' },
      { ln:6,  code:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> mid' },
      { ln:7,  code:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">elif</span> arr[mid] &lt; target:' },
      { ln:8,  code:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;low = mid + <span class="nm">1</span>' },
      { ln:9,  code:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">else</span>:' },
      { ln:10, code:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;high = mid - <span class="nm">1</span>' },
      { ln:11, code:'&nbsp;&nbsp;<span class="kw">return</span> -<span class="nm">1</span>' },
    ],

    steps: [
      { line:1,  mech:'Function binary_search(arr, target) is called with arr=[2,5,8,12,16,23,38,45] and target=23.', conc:'This is the function definition. Execution begins here. Two parameters come in: the sorted array, and the value we are hunting.', memory:{}, stack:['binary_search([2..45], 23)'], arr:{} },
      { line:2,  mech:'Set low=0 (first index) and high=7 (last index = len(arr)-1).', conc:'These two variables are our search boundaries — like walls that close in. We start with the full array in view.', memory:{low:0,high:7,mid:'—',target:23}, stack:['binary_search(...)'], arr:{lo:0,hi:7,mi:-1} },
      { line:3,  mech:'While condition: is 0 <= 7? YES. Enter the loop.', conc:'The loop continues as long as there is a valid search window (low hasn\'t crossed high). If low > high, the element doesn\'t exist.', memory:{low:0,high:7,mid:'—',target:23}, stack:['binary_search(...)'], arr:{lo:0,hi:7,mi:-1} },
      { line:4,  mech:'mid = (0 + 7) // 2 = 3. Integer division gives index 3.', conc:'We jump to the exact middle of the current window. This one move lets us discard half the remaining elements — the core of Binary Search.', memory:{low:0,high:7,mid:3,target:23}, stack:['binary_search(...)'], arr:{lo:0,hi:7,mi:3} },
      { line:5,  mech:'arr[3] = 12. Is 12 == 23? NO.', conc:'Middle element is not the target. But now we know: should we go left or right?', memory:{low:0,high:7,mid:3,target:23}, stack:['binary_search(...)'], arr:{lo:0,hi:7,mi:3} },
      { line:7,  mech:'arr[3]=12. Is 12 < 23? YES. Target must be in the right half.', conc:'Key insight: since the array is sorted, EVERY element left of index 3 is also ≤ 12. None of them can be 23. We safely discard all of them at once.', memory:{low:0,high:7,mid:3,target:23}, stack:['binary_search(...)'], arr:{lo:0,hi:7,mi:3} },
      { line:8,  mech:'Set low = mid + 1 = 4. Left half is now permanently discarded.', conc:'One comparison. Half the array gone. This is why Binary Search is O(log n) — each iteration halves the problem.', memory:{low:4,high:7,mid:3,target:23}, stack:['binary_search(...)'], arr:{lo:4,hi:7,mi:3} },
      { line:3,  mech:'While condition: is 4 <= 7? YES. Continue searching.', conc:'Still a valid window — indices 4 through 7 remain. [16, 23, 38, 45].', memory:{low:4,high:7,mid:3,target:23}, stack:['binary_search(...)'], arr:{lo:4,hi:7,mi:-1} },
      { line:4,  mech:'mid = (4 + 7) // 2 = 5. New midpoint of remaining window.', conc:'Jump straight to the middle of our remaining [16,23,38,45] slice. arr[5] = 23.', memory:{low:4,high:7,mid:5,target:23}, stack:['binary_search(...)'], arr:{lo:4,hi:7,mi:5} },
      { line:5,  mech:'arr[5] = 23. Is 23 == 23? YES! Target found.', conc:'Only 2 comparisons to find an element in an 8-element array. Linear search would have taken 6. This gap only grows as the array gets larger.', memory:{low:4,high:7,mid:5,target:23}, stack:['binary_search(...)'], arr:{lo:4,hi:7,mi:5,found:true} },
      { line:6,  mech:'Return mid = 5. This is the index of 23 in the original array.', conc:'Done in 2 iterations. For 1,000,000 elements, Binary Search needs at most 20 iterations. Linear Search would need up to 1,000,000. That\'s the O(log n) power.', memory:{low:4,high:7,mid:5,target:23,'RETURN':5}, stack:[], arr:{lo:4,hi:7,mi:5,found:true} },
    ],

    complexity: {
      time:  [{ case:'BEST',  val:'O(1)',      color:'cx-g', note:'Target is mid on first check' },
              { case:'AVG',   val:'O(log n)',  color:'cx-y', note:'Halves search space each step' },
              { case:'WORST', val:'O(log n)',  color:'cx-y', note:'Target at edge or missing' }],
      space: [{ case:'SPACE', val:'O(1)',      color:'cx-g', note:'Only 3 variables: low, high, mid' }],
      reasoning: 'Each iteration halves the problem. After k steps, only n/2^k elements remain. Solving n/2^k=1 gives k = log₂(n).'
    },

    improvement: [
      { label:'NAIVE APPROACH', type:'bad',  text:'Linear Search — O(n). Checks every element one by one. Works on unsorted arrays but wastes the sorted property.' },
      { label:'OPTIMIZED',      type:'good', text:'Binary Search — O(log n). Eliminates half the search space per step. Requires sorted input but is exponentially faster.' },
    ],

    mistakes: [
      { title:'USING ON UNSORTED', desc:'Binary search only works on sorted arrays. Calling it on unsorted data gives wrong results — no error thrown, just silently wrong.' },
      { title:'INTEGER OVERFLOW',  desc:'mid=(low+high)//2 can overflow in Java/C++. Safer: mid = low + (high-low)//2. Python integers are unbounded so no issue.' },
      { title:'INFINITE LOOP',     desc:'Forgetting to update low or high inside the loop causes infinite looping. Always do low=mid+1 or high=mid-1, never mid.' },
    ],

    ai: {
      'mid':       'Line 4: mid = (low+high)//2 finds the exact middle index. We use // (floor division) to always get a whole number. Safe version for large arrays: mid = low + (high-low)//2 to avoid overflow in languages like Java or C++.',
      'low':       'low is the LEFT boundary of our current search window (starts at 0). When arr[mid] < target, we update low=mid+1 to eliminate the left half. The target must be to the right.',
      'high':      'high is the RIGHT boundary (starts at len(arr)-1). When arr[mid] > target, we update high=mid-1 to eliminate the right half. The target must be to the left.',
      'while':     'Line 3: the while loop runs as long as low <= high — meaning there\'s still a valid search window. When low > high, we\'ve exhausted all possibilities and return -1.',
      'return':    'Line 6 returns mid — the index where we found the target. Line 11 returns -1 as a sentinel meaning "not found". Always check for -1 when using this function!',
      'sorted':    'Binary search REQUIRES sorted input. It makes decisions based on comparison: if arr[mid] < target, we KNOW everything left is also smaller (sorted property guarantees this). On unsorted arrays, this logic breaks completely.',
      'log':       'O(log n) means: each step halves the problem. After k steps, n/2^k elements remain. Setting n/2^k = 1 and solving for k gives k = log₂(n). For n=1,000,000 that\'s just 20 steps!',
    }
  },

  bubble_sort: {
    title: 'BUBBLE SORT',
    target: 'INPUT: [64,34,25,12]',
    arrData: [64, 34, 25, 12],

    concept: {
      what:   'Bubble Sort repeatedly steps through the array, compares adjacent elements, and swaps them if they\'re in the wrong order. Larger elements "bubble up" to the end with each pass.',
      when:   'Educational purposes and tiny arrays only. O(n²) makes it impractical for real use. Understanding it teaches the swapping and comparison patterns seen in faster sorts.',
      tags:   [{ label:'IN-PLACE', color:'green' }, { label:'STABLE', color:'blue' }, { label:'O(N²)', color:'pink' }]
    },

    code: [
      { ln:1, code:'<span class="kw">def</span> <span class="fn2">bubble_sort</span>(arr):' },
      { ln:2, code:'&nbsp;&nbsp;n = len(arr)' },
      { ln:3, code:'&nbsp;&nbsp;<span class="kw">for</span> i <span class="kw">in</span> range(n):' },
      { ln:4, code:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">for</span> j <span class="kw">in</span> range(<span class="nm">0</span>, n-i-<span class="nm">1</span>):' },
      { ln:5, code:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> arr[j] &gt; arr[j+<span class="nm">1</span>]:' },
      { ln:6, code:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+<span class="nm">1</span>] = arr[j+<span class="nm">1</span>], arr[j]' },
      { ln:7, code:'&nbsp;&nbsp;<span class="kw">return</span> arr' },
    ],

    steps: [
      { line:1, mech:'Function bubble_sort(arr) is called with arr=[64,34,25,12].', conc:'We will sort this array in-place — the original array is modified directly.', memory:{}, stack:['bubble_sort([64,34,25,12])'], arr:{data:[64,34,25,12]} },
      { line:2, mech:'n = len(arr) = 4. Store the array length.', conc:'We need n to control both the outer and inner loop bounds.', memory:{n:4,i:'—',j:'—'}, stack:['bubble_sort(...)'], arr:{data:[64,34,25,12]} },
      { line:3, mech:'Outer loop: i=0. First pass begins.', conc:'Each outer pass guarantees the largest unsorted element reaches its final position. After pass 0, the biggest element is at the end.', memory:{n:4,i:0,j:'—'}, stack:['bubble_sort(...)'], arr:{data:[64,34,25,12]} },
      { line:4, mech:'Inner loop: j=0. Compare arr[0]=64 and arr[1]=34.', conc:'We compare adjacent pairs. If left > right, swap. Larger values "bubble right" like a bubble rising in water.', memory:{n:4,i:0,j:0}, stack:['bubble_sort(...)'], arr:{data:[64,34,25,12],cur:0} },
      { line:5, mech:'64 > 34? YES — they are out of order. Swap needed.', conc:'64 is bigger than its right neighbor 34. It needs to move right.', memory:{n:4,i:0,j:0}, stack:['bubble_sort(...)'], arr:{data:[64,34,25,12],cur:0} },
      { line:6, mech:'SWAP: arr[0]=34, arr[1]=64. Array is now [34,64,25,12].', conc:'Python tuple swap is atomic: a,b=b,a. No temp variable needed. 64 bubbled one step right.', memory:{n:4,i:0,j:0}, stack:['bubble_sort(...)'], arr:{data:[34,64,25,12],cur:1} },
      { line:4, mech:'j=1. Compare arr[1]=64 and arr[2]=25. 64>25 → SWAP.', conc:'64 keeps bubbling right. One more swap.', memory:{n:4,i:0,j:1}, stack:['bubble_sort(...)'], arr:{data:[34,25,64,12],cur:2} },
      { line:4, mech:'j=2. Compare arr[2]=64 and arr[3]=12. 64>12 → SWAP.', conc:'64 reaches its final position at index 3. After this pass, 64 is permanently sorted.', memory:{n:4,i:0,j:2}, stack:['bubble_sort(...)'], arr:{data:[34,25,12,64],cur:3} },
      { line:7, mech:'After all passes: [12,25,34,64]. Return sorted array.', conc:'O(n²) time — two nested loops each up to n iterations. Simple but slow. For n=1000 that\'s ~1,000,000 operations. Merge Sort does the same in ~10,000.', memory:{n:4,'RETURN':'[12,25,34,64]'}, stack:[], arr:{data:[12,25,34,64]} },
    ],

    complexity: {
      time:  [{ case:'BEST',  val:'O(n)',   color:'cx-g', note:'Already sorted (with optimization flag)' },
              { case:'AVG',   val:'O(n²)',  color:'cx-r', note:'Random input' },
              { case:'WORST', val:'O(n²)',  color:'cx-r', note:'Reverse sorted input' }],
      space: [{ case:'SPACE', val:'O(1)',   color:'cx-g', note:'Sorts in-place, no extra memory' }],
      reasoning: 'Two nested loops each running up to n times = O(n²). The inner loop shrinks by 1 each outer pass, but still O(n²) on average.'
    },

    improvement: [
      { label:'NAIVE (BUBBLE SORT)', type:'bad',  text:'O(n²) — always runs both loops even if array becomes sorted early. Checks pairs it has already sorted.' },
      { label:'OPTIMIZED',           type:'good', text:'Add a "swapped" flag: if inner loop completes with no swaps, array is sorted → break early. Best case improves to O(n).' },
    ],

    mistakes: [
      { title:'WRONG INNER BOUND', desc:'Inner loop must go to n-i-1, not n-1. Missing the -i means comparing already-sorted tail elements — redundant work.' },
      { title:'NO EARLY EXIT',     desc:'Without a swapped=False flag, best case is still O(n²) even when array is already sorted. Add: if not swapped: break.' },
      { title:'BAD SWAP SYNTAX',   desc:'arr[j]=arr[j+1]; arr[j+1]=arr[j] FAILS — overwrites before saving. Use temp: t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t — or Python\'s tuple swap.' },
    ],

    ai: {
      'swap':   'Line 6: Python\'s tuple swap a,b = b,a works by creating a temporary tuple (b,a) on the right, then unpacking it. This is atomic — both assignments happen simultaneously. Other languages need an explicit temp variable.',
      'inner':  'Line 4: The inner loop goes from 0 to n-i-2 (range(0, n-i-1)). The -i is important: after each outer pass, the last i elements are already in their final sorted position — no need to re-check them.',
      'bubble': 'Why "bubble"? Larger values move right one step per comparison, like a bubble rising through water. After 1 full pass, the largest element has bubbled all the way to the end.',
      'n2':     'O(n²) happens because of two nested loops. Outer runs n times, inner runs ~n times each = n × n = n² total comparisons. For n=1000 that\'s 1,000,000 comparisons vs Merge Sort\'s ~10,000.',
    }
  },

  factorial: {
    title: 'FACTORIAL (RECURSION)',
    target: 'INPUT: n=4',
    arrData: [],

    concept: {
      what:   'Factorial(n) computes n! = n × (n-1) × ... × 1 using recursion. The function calls itself with a smaller input until it hits the base case (n=0 or n=1), then unwinds.',
      when:   'Use to understand recursion fundamentals. The call stack visually shows how recursive calls stack up and then unwind. Critical concept for tree traversal, DFS, divide & conquer.',
      tags:   [{ label:'RECURSION', color:'orange' }, { label:'CALL STACK', color:'purple' }, { label:'BASE CASE', color:'pink' }]
    },

    code: [
      { ln:1, code:'<span class="kw">def</span> <span class="fn2">factorial</span>(n):' },
      { ln:2, code:'&nbsp;&nbsp;<span class="kw">if</span> n == <span class="nm">0</span> <span class="kw">or</span> n == <span class="nm">1</span>:' },
      { ln:3, code:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="nm">1</span>' },
      { ln:4, code:'&nbsp;&nbsp;<span class="kw">return</span> n * <span class="fn2">factorial</span>(n - <span class="nm">1</span>)' },
    ],

    steps: [
      { line:1, mech:'factorial(4) is called. A new stack frame is created for n=4.', conc:'Every function call creates a "stack frame" — memory on the call stack holding its local variables. Recursive calls STACK these frames on top of each other.', memory:{n:4}, stack:['factorial(4)'], arr:{} },
      { line:2, mech:'Is n==0 or n==1? Is 4==0? No. Is 4==1? No. Skip base case.', conc:'The base case is the stopping condition. Without it, recursion is infinite and crashes with a RecursionError (stack overflow).', memory:{n:4}, stack:['factorial(4)'], arr:{} },
      { line:4, mech:'Return 4 * factorial(3). A NEW call is made — factorial(3).', conc:'factorial(4) is now PAUSED waiting for factorial(3) to return. Its frame stays on the stack. The stack grows deeper.', memory:{n:4}, stack:['factorial(4)','factorial(3)'], arr:{} },
      { line:2, mech:'factorial(3): Is 3==0 or 3==1? No. Skip base case.', conc:'New active frame: n=3. factorial(4) is frozen above it, waiting.', memory:{n:3}, stack:['factorial(4)','factorial(3)'], arr:{} },
      { line:4, mech:'Return 3 * factorial(2). Stack grows. factorial(2) now called.', conc:'Stack depth = n. This is why factorial has O(n) space complexity — the call stack holds n frames simultaneously.', memory:{n:3}, stack:['factorial(4)','factorial(3)','factorial(2)'], arr:{} },
      { line:2, mech:'factorial(2): Is 2==1? No. Continue.', conc:'Stack frame 3. Three function calls are "in progress" simultaneously, paused and waiting.', memory:{n:2}, stack:['factorial(4)','factorial(3)','factorial(2)'], arr:{} },
      { line:4, mech:'Return 2 * factorial(1). Final recursive call made.', conc:'Almost at the base case! One more frame pushed.', memory:{n:2}, stack:['factorial(4)','factorial(3)','factorial(2)','factorial(1)'], arr:{} },
      { line:2, mech:'factorial(1): Is n==1? YES! Base case hit!', conc:'The recursion stops here. Now the stack starts UNWINDING — returning values back up the chain.', memory:{n:1}, stack:['factorial(4)','factorial(3)','factorial(2)','factorial(1)'], arr:{} },
      { line:3, mech:'Return 1. factorial(1) frame POPS off the stack.', conc:'factorial(2) now receives the value 1 and can continue: it returns 2 * 1.', memory:{n:1,'RETURN':1}, stack:['factorial(4)','factorial(3)','factorial(2)'], arr:{} },
      { line:4, mech:'factorial(2) resumes: returns 2 * 1 = 2. Frame pops.', conc:'factorial(3) now has its answer and continues: returns 3 * 2 = 6.', memory:{n:2,'RETURN':2}, stack:['factorial(4)','factorial(3)'], arr:{} },
      { line:4, mech:'factorial(3) resumes: returns 3 * 2 = 6. Frame pops.', conc:'factorial(4) can now complete: returns 4 * 6 = 24.', memory:{n:3,'RETURN':6}, stack:['factorial(4)'], arr:{} },
      { line:4, mech:'factorial(4) resumes: returns 4 * 6 = 24. Stack is now EMPTY.', conc:'4! = 24. The entire recursion unwound. Stack is empty. Notice how the "return journey" assembled the answer from the bottom up: 1 → 2 → 6 → 24.', memory:{n:4,'RETURN':24}, stack:[], arr:{} },
    ],

    complexity: {
      time:  [{ case:'BEST',  val:'O(n)',  color:'cx-y', note:'Always n recursive calls regardless' },
              { case:'AVG',   val:'O(n)',  color:'cx-y', note:'Linear in n' },
              { case:'WORST', val:'O(n)',  color:'cx-y', note:'No shortcutting possible' }],
      space: [{ case:'SPACE', val:'O(n)',  color:'cx-y', note:'Call stack holds n frames simultaneously' }],
      reasoning: 'Every call to factorial(n) makes exactly one more call to factorial(n-1). This chains n calls deep. Each frame occupies stack memory → O(n) space.'
    },

    improvement: [
      { label:'RECURSIVE (NAIVE)', type:'bad',  text:'O(n) space from call stack. For very large n (>10,000) Python hits RecursionError. Each frame holds a return address and local vars.' },
      { label:'ITERATIVE (BETTER)', type:'good', text:'Use a loop instead: result=1; for i in range(2,n+1): result*=i. O(1) space — no call stack, no recursion limit. Same O(n) time.' },
    ],

    mistakes: [
      { title:'MISSING BASE CASE', desc:'Without "if n==0 or n==1: return 1", recursion never stops → RecursionError. Always define your base case first!' },
      { title:'WRONG BASE CASE',   desc:'Only checking n==1 misses factorial(0) which should return 1 (by definition, 0! = 1). Add n==0 to the condition.' },
      { title:'STACK OVERFLOW',    desc:'factorial(10000) will crash Python (default recursion limit ~1000). For large n, use iterative version or sys.setrecursionlimit() with caution.' },
    ],

    ai: {
      'base':      'Lines 2-3: The base case is the stopping condition for recursion. Without it, factorial keeps calling itself forever until Python raises RecursionError (stack overflow). Rule: always define the base case before the recursive case.',
      'recursion': 'Line 4: return n * factorial(n-1) does two things: (1) makes a recursive call with a SMALLER input, and (2) waits for that call to return before completing. The frame is paused on the call stack until factorial(n-1) resolves.',
      'stack':     'Call stack: each function call creates a "frame" in memory containing local variables and a return address. Recursive calls PUSH frames. Returns POP them. Stack depth = n for factorial(n), hence O(n) space complexity.',
      'unwind':    'Unwinding: after hitting the base case (factorial(1)=1), the stack pops frames one by one, each one computing its partial result and passing it up: 1 → 2*1=2 → 3*2=6 → 4*6=24. The answer assembles from the bottom up.',
    }
  },

  linear_search: {
    title: 'LINEAR SEARCH',
    target: 'TARGET: 23',
    arrData: [2, 5, 8, 12, 16, 23],

    concept: {
      what:   'Linear Search scans every element in order until it finds the target or exhausts the array. No sorting required. Simple but slow.',
      when:   'Use on unsorted arrays, or tiny arrays where setup overhead of Binary Search isn\'t worth it. Also useful for finding ALL occurrences of a value.',
      tags:   [{ label:'UNSORTED OK', color:'green' }, { label:'SEQUENTIAL', color:'blue' }, { label:'O(N)', color:'yellow' }]
    },

    code: [
      { ln:1, code:'<span class="kw">def</span> <span class="fn2">linear_search</span>(arr, target):' },
      { ln:2, code:'&nbsp;&nbsp;<span class="kw">for</span> i <span class="kw">in</span> range(len(arr)):' },
      { ln:3, code:'&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> arr[i] == target:' },
      { ln:4, code:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> i' },
      { ln:5, code:'&nbsp;&nbsp;<span class="kw">return</span> -<span class="nm">1</span>' },
    ],

    steps: [
      { line:1, mech:'linear_search(arr, target=23) called with arr=[2,5,8,12,16,23].', conc:'Linear = in a line. We check elements one by one from left to right. No math tricks.', memory:{}, stack:['linear_search([2..23], 23)'], arr:{data:[2,5,8,12,16,23]} },
      { line:2, mech:'Loop starts: i=0. Begin scanning from index 0.', conc:'range(len(arr)) = range(6) = 0,1,2,3,4,5. We will visit every index unless we find it first.', memory:{i:0,target:23}, stack:['linear_search(...)'], arr:{data:[2,5,8,12,16,23],cur:0} },
      { line:3, mech:'arr[0]=2. Is 2==23? NO. No match at index 0.', conc:'One comparison used, nothing found. Move on. This is linear search — we must check every element until we find it.', memory:{i:0,target:23}, stack:['linear_search(...)'], arr:{data:[2,5,8,12,16,23],cur:0} },
      { line:2, mech:'i=1. Move to next element.', conc:'Step forward one index.', memory:{i:1,target:23}, stack:['linear_search(...)'], arr:{data:[2,5,8,12,16,23],cur:1} },
      { line:3, mech:'arr[1]=5. Is 5==23? NO.', conc:'Still no match. Linear search has no way to "skip" elements — it must check each one.', memory:{i:1,target:23}, stack:['linear_search(...)'], arr:{data:[2,5,8,12,16,23],cur:1} },
      { line:2, mech:'i=2,3,4 — all miss. arr=[8,12,16] ≠ 23. Advancing to i=5.', conc:'Compare vs Binary Search: at this point Binary Search already found it (2 comparisons). We\'ve used 5 and aren\'t done yet.', memory:{i:5,target:23}, stack:['linear_search(...)'], arr:{data:[2,5,8,12,16,23],cur:5} },
      { line:3, mech:'arr[5]=23. Is 23==23? YES! Target found at index 5.', conc:'Found it — but only after 6 comparisons. Binary Search found the same element in 2. For n=1,000,000, this difference is catastrophic.', memory:{i:5,target:23}, stack:['linear_search(...)'], arr:{data:[2,5,8,12,16,23],cur:5,found:true} },
      { line:4, mech:'Return i=5. Target found at index 5. Function ends.', conc:'O(n) time — in the worst case we scan every element. BUT this works on unsorted arrays, which Binary Search cannot. That\'s linear search\'s one advantage.', memory:{i:5,target:23,'RETURN':5}, stack:[], arr:{data:[2,5,8,12,16,23],cur:5,found:true} },
    ],

    complexity: {
      time:  [{ case:'BEST',  val:'O(1)',  color:'cx-g', note:'Target is first element' },
              { case:'AVG',   val:'O(n)',  color:'cx-y', note:'Target in middle on average' },
              { case:'WORST', val:'O(n)',  color:'cx-r', note:'Target at end or not found' }],
      space: [{ case:'SPACE', val:'O(1)',  color:'cx-g', note:'Only one loop variable i' }],
      reasoning: 'One loop from 0 to n-1. In the worst case (target at end or missing), we visit all n elements. No halving, no shortcuts = O(n).'
    },

    improvement: [
      { label:'LINEAR SEARCH', type:'bad',  text:'O(n) time — checks every element. For sorted data, this wastes the sorted property entirely. Impractical for large n.' },
      { label:'BINARY SEARCH', type:'good', text:'If array is sorted, use Binary Search — O(log n). For n=1,000,000: Linear=1M ops, Binary=20 ops. Always prefer Binary Search on sorted arrays.' },
    ],

    mistakes: [
      { title:'MISSING RETURN -1', desc:'After the loop, if target wasn\'t found, the function MUST return -1. Without it, Python implicitly returns None — callers get confused.' },
      { title:'OFF BY ONE',        desc:'range(len(arr)) gives indices 0 through len-1. Using range(1, len+1) would skip index 0 and access out-of-bounds at the end.' },
      { title:'WRONG ON SORTED',   desc:'Using linear search on a sorted array is inefficient. If data is sorted, always use Binary Search (O(log n)) instead of scanning linearly.' },
    ],

    ai: {
      'return':   'Line 5: return -1 is the "not found" signal. This runs AFTER the loop exits without finding the target. Always check if a function returned -1 before using the result.',
      'range':    'range(len(arr)) generates indices: 0, 1, 2, ..., len-1. It doesn\'t include len itself. This correctly accesses every valid array index without going out of bounds.',
      'linear':   '"Linear" means we scan in a straight line from start to end. No branching, no halving. Simple but O(n) — proportional to array size. Double the array, double the time.',
      'unsorted': 'Linear Search\'s advantage: works on UNSORTED arrays. Binary Search requires sorted input. For truly unsorted data or one-time searches, linear search is the right choice.',
    }
  }
};

/* ═══════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════ */
let curAlgo    = 'binary_search';
let curStep    = 0;
let playing    = false;
let playTimer  = null;

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
window.addEventListener('load', () => {
  loadAlgo('binary_search');

  document.getElementById('algoSel').querySelectorAll('.asel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.asel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadAlgo(btn.dataset.algo);
    });
  });

  document.getElementById('aiInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') askAI();
  });
});

/* ═══════════════════════════════════════════════════════════
   LOAD ALGORITHM
═══════════════════════════════════════════════════════════ */
function loadAlgo(name) {
  curAlgo = name;
  curStep = 0;
  playing = false;
  if (playTimer) { clearInterval(playTimer); playTimer = null; }
  document.getElementById('playBtn').textContent = '▶ PLAY';

  const a = ALGOS[name];
  document.getElementById('learnTitle').textContent = '▶ ' + a.title;
  document.getElementById('cdTarget').textContent   = a.target;

  // Render concept overview
  renderConcept(a);

  // Render code
  const cl = document.getElementById('codeLines');
  cl.innerHTML = a.code.map(l =>
    `<div class="cl" id="cl-${l.ln}">
      <span class="cl-num">${l.ln}</span>
      <span class="cl-code">${l.code}</span>
    </div>`
  ).join('');

  // Render complexity
  renderComplexity(a.complexity);

  // Render improvements
  renderImprovement(a.improvement);

  // Render mistakes
  document.getElementById('mistakesBody').innerHTML = a.mistakes.map(m =>
    `<div class="mk-item"><strong>⚠ ${m.title}</strong>${m.desc}</div>`
  ).join('');

  // Reset panels
  document.getElementById('memBody').innerHTML = '<div style="font-size:16px;color:var(--muted);padding:4px;">No variables yet — press PLAY</div>';
  document.getElementById('stackBody').innerHTML = '<div class="stack-frame sf-prev" style="opacity:.35;">[ empty ]</div>';
  document.getElementById('epBadge').textContent = 'STEP 0';
  document.getElementById('epMech').textContent  = 'Press PLAY or NEXT to start.';
  document.getElementById('epConc').textContent  = 'The conceptual reason behind each step will appear here.';
  document.getElementById('pbFill').style.width  = '0%';
  document.getElementById('stepCounter').textContent = `0 / ${a.steps.length}`;
  document.getElementById('aiResponse').classList.remove('show');

  // Init visualization
  renderArr(null);
}

/* ── CONCEPT OVERVIEW ── */
function renderConcept(a) {
  const c = a.concept;
  const colorMap = { green:'var(--green)',blue:'var(--blue)',purple:'var(--purple)',pink:'var(--pink)',orange:'var(--orange)',yellow:'var(--yellow)' };
  const borderMap = { green:'rgba(61,255,154,.3)',blue:'rgba(60,172,255,.3)',purple:'rgba(162,89,255,.3)',pink:'rgba(255,60,172,.3)',orange:'rgba(255,107,53,.3)',yellow:'rgba(255,214,10,.3)' };

  document.getElementById('coGrid').innerHTML = `
    <div class="co-section">
      <div class="co-label">WHAT IT DOES</div>
      <div class="co-text">${c.what}</div>
    </div>
    <div class="co-section">
      <div class="co-label">WHEN TO USE</div>
      <div class="co-text">${c.when}</div>
      <div class="co-tags">
        ${c.tags.map(t => `<span class="co-tag" style="color:${colorMap[t.color]};border-color:${borderMap[t.color]};background:${colorMap[t.color]}18;">${t.label}</span>`).join('')}
      </div>
    </div>
  `;
}

/* ── COMPLEXITY ── */
function renderComplexity(cx) {
  document.getElementById('cxBody').innerHTML = `
    <div class="cx-group">
      <div class="cx-group-label">TIME COMPLEXITY</div>
      <div class="cx-rows">
        ${cx.time.map(r => `<div class="cx-row"><span class="cx-case">${r.case}</span><div style="text-align:right;"><span class="cx-val ${r.color}">${r.val}</span><div class="cx-reasoning">${r.note}</div></div></div>`).join('')}
      </div>
    </div>
    <div class="cx-group">
      <div class="cx-group-label">SPACE COMPLEXITY</div>
      <div class="cx-rows">
        ${cx.space.map(r => `<div class="cx-row"><span class="cx-case">${r.case}</span><div style="text-align:right;"><span class="cx-val ${r.color}">${r.val}</span><div class="cx-reasoning">${r.note}</div></div></div>`).join('')}
      </div>
    </div>
    <div class="cx-group">
      <div class="cx-group-label">REASONING</div>
      <div class="cx-reasoning" style="font-size:16px;color:var(--muted);line-height:1.5;">${cx.reasoning}</div>
    </div>
  `;
}

/* ── IMPROVEMENT BLOCK ── */
function renderImprovement(items) {
  document.getElementById('ibGrid').innerHTML = items.map(item => `
    <div class="ib-item ${item.type === 'bad' ? 'ib-bad' : 'ib-good'}">
      <div class="ib-label">${item.type === 'bad' ? '✗ ' : '✓ '}${item.label}</div>
      <div class="ib-text">${item.text}</div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════
   RENDER STEP
═══════════════════════════════════════════════════════════ */
function renderStep(idx) {
  const a = ALGOS[curAlgo];
  if (idx < 0 || idx >= a.steps.length) return;
  const s = a.steps[idx];

  // Highlight code line
  document.querySelectorAll('.cl').forEach(el => el.classList.remove('hl'));
  const lel = document.getElementById('cl-' + s.line);
  if (lel) { lel.classList.add('hl'); lel.scrollIntoView({ behavior:'smooth', block:'nearest' }); }

  // Explanation — split mech + conc
  document.getElementById('epBadge').textContent = `STEP ${idx+1} / ${a.steps.length}`;
  document.getElementById('epMech').textContent  = s.mech;
  document.getElementById('epConc').textContent  = s.conc;

  // Memory
  const memEl = document.getElementById('memBody');
  const entries = Object.entries(s.memory);
  memEl.innerHTML = entries.length
    ? entries.map(([k,v]) =>
        `<div class="var-row">
          <span class="var-name">${k}</span>
          <span class="var-eq">=</span>
          <span class="var-val" id="mv-${k}">${JSON.stringify(v)}</span>
        </div>`
      ).join('')
    : '<div style="font-size:16px;color:var(--muted);padding:4px;">No variables yet</div>';

  // Call stack
  const stkEl = document.getElementById('stackBody');
  stkEl.innerHTML = s.stack.length
    ? s.stack.map((f, i) =>
        `<div class="stack-frame ${i === s.stack.length-1 ? 'sf-active' : 'sf-prev'}"
          style="opacity:${Math.max(0.2, 1 - i * 0.2)}">${f}</div>`
      ).join('')
    : '<div class="stack-frame sf-prev" style="opacity:.3;">[ empty — returned ]</div>';

  // Array viz
  if (s.arr !== undefined) renderArr(s.arr);

  // Progress
  const pct = ((idx + 1) / a.steps.length) * 100;
  document.getElementById('pbFill').style.width      = pct + '%';
  document.getElementById('stepCounter').textContent = `${idx+1} / ${a.steps.length}`;
}

/* ── ARRAY VISUALIZATION ── */
function renderArr(state) {
  const a   = ALGOS[curAlgo];
  const viz = document.getElementById('learnArrViz');

  if (!a.arrData.length) {
    viz.innerHTML = '<div style="font-size:18px;color:var(--muted);padding:20px 0;">Recursion in action — see the Call Stack panel →</div>';
    return;
  }
  if (!state || Object.keys(state).length === 0) {
    viz.innerHTML = a.arrData.map((v, i) =>
      `<div class="ac"><div class="ab">${v}</div><div class="aidx">${i}</div><div class="atag"></div></div>`
    ).join('');
    return;
  }

  const arr = state.data || a.arrData;
  viz.innerHTML = arr.map((v, i) => {
    let cls = 'ab';
    let tag = '';
    if (state.lo !== undefined && i === state.lo) { cls += ' lo'; tag = '<span class="tl">L</span>'; }
    if (state.hi !== undefined && i === state.hi) { cls += ' hi'; tag = '<span class="th">H</span>'; }
    if (state.mi !== undefined && i === state.mi) { cls += state.found ? ' fd' : ' mi'; tag = '<span class="tm">M</span>'; }
    if (state.cur !== undefined && i === state.cur) { cls += state.found ? ' fd' : ' cur'; }
    return `<div class="ac"><div class="${cls}">${v}</div><div class="aidx">${i}</div><div class="atag">${tag}</div></div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════
   PLAY CONTROLS
═══════════════════════════════════════════════════════════ */
function learnStep(dir) {
  const a = ALGOS[curAlgo];
  const next = curStep + dir;
  if (next >= 0 && next < a.steps.length) {
    curStep = next;
    renderStep(curStep);
  }
}

function learnToggle() {
  playing = !playing;
  const btn = document.getElementById('playBtn');
  btn.textContent = playing ? '⏸ PAUSE' : '▶ PLAY';

  if (playing) {
    const speed = parseInt(document.getElementById('speedSel').value);
    playTimer = setInterval(() => {
      const a = ALGOS[curAlgo];
      if (curStep < a.steps.length - 1) {
        curStep++;
        renderStep(curStep);
      } else {
        playing = false;
        btn.textContent = '▶ PLAY';
        clearInterval(playTimer);
        playTimer = null;
      }
    }, speed);
  } else {
    if (playTimer) { clearInterval(playTimer); playTimer = null; }
  }
}

/* ═══════════════════════════════════════════════════════════
   AI DOUBT ASSISTANT
═══════════════════════════════════════════════════════════ */
function askAI() {
  const q    = document.getElementById('aiInput').value.toLowerCase().trim();
  const resp = document.getElementById('aiResponse');
  const ai   = ALGOS[curAlgo].ai || {};

  let answer = '';
  for (const [key, val] of Object.entries(ai)) {
    if (q.includes(key)) { answer = val; break; }
  }

  if (!answer) {
    const s    = ALGOS[curAlgo].steps[curStep] || {};
    const step = curStep + 1;
    answer = `On Step ${step} (Line ${s.line || '?'}): ${s.mech || ''} — ${s.conc || ''} Try asking about specific keywords like "mid", "low", "while", "swap", "base", "recursion", "return", "sorted", etc.`;
  }

  resp.innerHTML = `<strong>🤖 AI SAYS:</strong><br/>${answer}`;
  resp.classList.add('show');
}
