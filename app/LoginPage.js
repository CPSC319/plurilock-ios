/*
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  View,
  AlertIOS
} from 'react-native';
//import ExNavigator from '@exponent/react-native-navigator';
import TabBar from "./TabBar"
import Button from 'react-native-button'
var YourRouter = require('./route.js');
var Animatable = require('react-native-animatable');
const logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAgAElEQVR4Xu19B5hb1dH2e6+kVV2VrV7vurd1wR1jbAzYuFBsYwMOLZQACYQAAZI/HyEfoQT4CAHSgITQQwfbYLApBhds4957716XLSorrXZX0j3/M3MlrbZJ2r7GnudxTKxz25k5c+bMvDMj4Syd0TMgndFff/bj0ZYCIFkslkykpGQooZDpLC/qnwFZlstDsuz0FxcfB6A051y1qgCYMzM7IBC4DkJMUiRppAzYm/NjfvT3EsIvhFgHWf5WqygfeDyePU395lYRAKvV2isky48AuAGApqkvffb68AxI0jeKJD3mLylZ2dg5aWkB0Jrs9ocl4A8AUiIvqe+aB0N+N6TkdoDGboUIBKEEAo39hh/3dQJAIICQtwyVx0+hYs9BBI4X1vzm10063f2FhYXehk5GiwmAzWZzVErSLBkYSy8laTQwjx4K27jzoc1Ma+h7nh0fMwOBE4XwLF4F34oNEMEQ/6JI0i5dKDTZ4/HsbchktYgApKampgdleZEsSefQy+i75iL9punQdchoyLudHZtgBoKFJSh+73OU7zmoCgFwSiPL47wlJduSnbzmF4CuXQ1mt3sxhDiPXsJy3mCk3TAFkvbs1p8sUxo0TlHg/HwhPN8uUy8T4pjQ6UaUFRUVJHOfZhcAk93+ogT8ipl//hCk3zgVkJr9Mcl82xk1xvXV93DPXRTRBIv9Ltd4AOr+EIealTOpDscYRYglrPZ7dEb2r2+FpJHjvkDZpp2oPHws0Xue0b9rLGZYLjyX7ah6SQgUvfMZfKs2hRWBuKvM7X4l0cQ1pwBIZrudjiMjJJ0WHR+5B9r0+Md8xVuGI//zbKJ3PPs7gMzbroFp2IC4cyEqKlHwp5cQdLrJHijy6/VdcfKkr1U0gMVuv1gArINsl14I+5RxCRlXeewkjj/9r4Tjzg4AHNMnwDp+dMKp8K3diqI3Z/I4CbjP63L9s1UEwGy1vg1ZvpmMvbynfgPZkti7W7psLUo+mMvvl/d/v4XGakn4gWfagKMP/QWhUh9MQ/oh846fJP58RUHB4/9EoMhJYzf4XK6hrSEAstFuL5IBR9IvKgSO//k/qDxyHLqOWej4h7sTf9wZOKLorVnwrdnCp6jcJ+6HxpaacBbc8xbD9eViHqfIcmd/ScmR+i5qFhvA7HAMhBBsfaTfMBWW0XGFjt/F890PcH76Lf93+nWTYRkzPOGHnYkDKvYfwYnnX+dPN/briaxf3gDI8Q3rigNHceK519TpkqSf+pzO91pUACw227VCkj6kh+Q8dCdSOuXUzytFgfu75XB9voDOrEjJ64AOv/t5fAv3TOR8zDcXvjETZeu28r+YBuUj/adXQjYZ650Vcq0ffuApnl9JiKe8bvf/tqgAmO32BwE8Tw/p9NxDkI2Gas8jj1WwxIXKwwXwrtiIwMki/p32/A4P3nbWNZxAwEV5BU789U1UHj3BI4n55GPR9+4KrS2VF1FNX8ux/30BQacHUJS3fR7PrS0qACa7/Y8S8Dg9pMs//1hNRZXvOoCT/3i71vPppcmoaeu4AK0WOo0ETxbxhCnl5TRpoKOsxpoKXXYGT3AyRm1LKiqlzI+it2fDv7V2BNg28QLYryS/TxUVPPkSB40EMLvM5bq6RQXAYrc/JoBHWQBeeqzas2ItffqBDD7rhSNgHjWkzdS+4vOzSvVt3IGKfYeiAZV4DCQhMA7Kh+XcgW0ntEKgbPNOeBasANkGpOJ5WxiYj8w7r6v2+sef/jcqj52ApChzvB7PtHYhAG191AsWu+D5Zim8qzdxCLpRJEkwDewD22UXxbd1GnXz5C9S/OU4/pdXETxZfPoIQE3tkPznNm2kCAbh/moJnzwi4VO6o9FuRe6wwcjq1xv2LnkwZ6RDZzJClmUEKyrhPloA1+GjKNy5FwXrN6PM6ap6EUmCZeRgOK6aGNcga9qbx786sspPGw3QFgJABmfhax8jUHAqOps5gweg75RJyBnYD1KCI1XkIqEoOLl1J3bOnY+j61R/OxGdyzNvn8Gxj9amswKQYMbLd+3Hqf98BLKiieydczHi5zchq1+fJvGqcPd+rH39XRTvPcD3oYBXGvkyRiX2fzTpwTUubj8CYLM9JSTpYXq/eEZga2oA//a9KHzlg6jKpxU/+MarodHpmoUHSiiErbPmYvPHc6LGWNo1lyJ17MhmuX8yN2kXAmC22SYqijJT1mjYR9keBIA8YSf//hYbepIkYeTdP0OPcWMSzml5UQm2/vM1pNhsGHDf7ZC12oTXHFmzAcuefxmhsFGZcctVMI8YmPC65hjQ1gIghc//j/FxJAz6aGsBCLlLcfyZVxDyqPjI0fffiW5jkluVx79fgQOffcXXDfp/d8PcsUNSfDqxZQcWPvkClGCQ/Qfk3Erp3DGpa5syqC0FQDLZbC9JkvRLRVHUlaKo+QptKgBC4NRL78G/Q8VFksofcNXkuHOsBIIoWLwcJ1euQ0UJR9CYNEYDHP16I2f0CKR2S2zgHfphNZa+oIa2tdkZ6Pj7u1gYWpLaTAAsdvsTAnhEUQQ0aTYYOuXAv2VXmwuAb+0WFL05i98jd+hAjH34/rhwtKCvDNv+9TZ8xyjhpn7Km3gxOl+WGN+w9o33sXOeGuBKFhPRFAFpEwEwORyXS0LMo5WvcdjhmDYe5Vt3R4MVbaUBaL+nODihYbQGPaa++AxMjviIJGK+e/c+5gFpMVrxxg6Z/P/9JwpRsm0XREiF1fW8bhqyzotv5QcrKzH3gUfgPXEKklaL3Cd+nVT4trFC0OoCkJaWZq0IhbYLgVzoU5A24zIQXq1s3ZY2FwDvyo0ofucznstBN1yNc66Or/rde/dj20tv8XiDw46+v7wFxsz0arwoO34SW198A8EyP7RmE4Y/9tuEhuHhVeuw5NkX+T7WCaPhmDahsfxNeF2rC4DFbn9cAf4oQgpsEy6AvmcXfsn2IAAU/ybrX2c04qpXn+e/4xEZe2T0EeX//Eak1eMbOLl8LfZ98jmPG/jAnbB0zo3PGCEw98FH4Dp8jKOi5P5uKVugVQUgIyMj1VdRcQySlKrLzmSMGqPO2oEAkI//2B//xu/S+9Jx7OxJRDvfeB8lW3bysJF//l/IKdHMtWqXKpWV2PnGBxy46nPrtZCT8CPsnr8Yq19RI6CZv7iOY/gtQa0qACab7Q5I0qu8+i8fC32XqmNOW2sA75I1KP5oHs/xxCceQlb/xJ6+XW9+iOLN2/ma8194nP0FzUUVpV7M/Nl9EEIgdcxw9hK2BLWqAJhttq+EwKWS0YCMm6cBUhUsqa0FgFCwhIYl4+8n/30Jcjz8fJgTh76Yj2ML1WyaYY88CH1a82aqf/37J1G0ex+nwxFEviWoNQVAa7bZPIoQRkN+T1gv5qyvKLW1AETAD+Tjn/inh5Kaa8+Bw9j6DxU3l3nuYPS8fnqzaoE1b7yHXfO+Y3BM5xcebhE7oNUEwJKe3leEQtvp6Jd68Xkw5vdsVwJw5IGnoFQG0GvCRTjvrnrRT7UEY+fr76Nkq2oHmHNz0PGi85E2IJ+dQE2lWDsg97H7WgRE0moCYE5LuxSK8hUJgOPKCdDlZLUbAaBY/+FfP8nvM3DGVAy8bnrSvAuVV2D3uzPh3KY6sYjI2LN27wx7315I658PY1bjMpoPr1iLJc+9xPfs8Ns7oO+Wl/R7JTuw9QTA4bgBQrxHAkAGjdZuazcCQMiYI799ht9nyE+vQf/pVyQ7f9Fxzu27cWrlejh37ga5hmOJBKH71ZNhSHc06L7H1m3Goqf/qgrAg7e1CF6gNQXgegjxvioAU6C1W6tNhm/NJvg3qBZ1a3sCKR/u8INP87OTcQDF4yJVKXHt2gfn1p0o3rYTQW8ZD9eajOh/9628TSRLR1avx/d/VrOyTn8NELsFTJsIXdhdSh9HSJmSt2dDhEu8tLYAUCTy8P1Pcty/79RLMeyWa5PlUdxxdNwtXLMB+z/9CuQL0DvsGPy7X0Fj0Cd1/70LlmDly2/y2Nw/3gttdnUvY1I3STCo1TRArBFoHXc+DL27R1+NBKD49Y+joIhWFwAAxygGcKoYnc8bhgt/17xHLtoedrz6rqrdpkxE7rgLkuLdxvdmYuvseRyM6vTXh5NyICV145hBrSYAFB01W61uIUlmQ79eSB1zbrV3LfnwCyjh+HtbCEDhqx+hbOMOpGZn4sqXmz/dfO2jf0GlpxT2/J7od+fNSfGJ8AEFG7aw9U+ngJag1hQAmOz2byUhxku2VKRfN6Xa97i/XIRAOGulLQTAs3AFnLO+4Xea9u/nYKkR1Gnq5G989iVQYMjSJQ8D7/9FwtspwRA+vvUeBP3ljA4ilFBLUKsKgNlm+x8hSc/Q3ph+83RozFXp395la1G+Xc1YaQsBoKpZVBiBaNit1zHiNyEJgX2z5iLk86P7jCls6NVHax99FpUeL9IH9UOfW6snYNR1TcHGrVj4J86UQ8Yt02EeMSjh6zRmQKsKgMlmGypJ0joCgRDw0dinyg5oa08gTR4VmqAUL1unXEz5658S1iUi/N/6p9QAUs6Ykeh21eV18oDAIpueU5E+XadMQsdxiYs0LHn+ZRxevoYxAXnP/LZWrmRjmF3XNa0qAISZMNjtJ2VFZFAYOLZaRXsQgNiA0MUP34+8YQlWnRDY8Mw/4T9VxC7gXjfPQMbg6iVYAl4fG4DecA2jwQ/dC1O2ChipjwgMMufe3/PpiCqkpVPcpIWotQUAZofjQyjKtdDrkXEr7WvtIxxM80tn+IJH/sbVNEgLXPH84wmDQp59B7Ht5beYWUTW7l2Q2qUT++0rip1wbt2FYEU5/9Zh1Lm8VSSipS/8G4d+WMUaqOMfflnLa5ro+ob83uoCYLLZ7pSAf9M24PjJ5dCFvWPtQQPQxMUmoiYDCKVrSrbvwt73ZjPqpz5KH9QfvW+ekTCLiKx+sv6JaN+n/b8lqbUFQDY6HHNkISaTR9AycghMg/vx97UXASBk8okX3mBkEIWEKTKY0ad64KouhgR8ZSDkT9GGLWztExFMzNI1DxnDB9WLFoq9l9/lwZe/eQT0N+Xvd3zkVy1e86hVBcDscPxeKOJp1vqKgC4vB/bJXAa4/QgA1VU+WcS1h8hFbLBZMemph5Gak53UQqSg0I7X1Goq/X5xEweEkqFgRQUWPPYsKGWMiOoeUK2klqZWEwCz3U4WFZ0ANBqTAUp5BQQkZN5BalHTrgSABXLDdk4IJTKlOzD+0d/Bmps4yYOigwQVI7BL/m3XQ6OvGyYWy9iA349F//d3nApHFG2TxsA+9ZKW5j3fv9UEwGi3L5QUMRYaDSwXDINv6RooIYU/lEq+t5stIGbaS79fjZKPv+R/SbGYMeaBu0BZwc1JpQUnsPjZF+E+olY6be3SuK0iAKkOx2hFUZaR4WcaMRDmc/JR/PYsxssbh/Tno057FABiCBuFH85T4xSShPwrJmDw9VcxdKwpRImhe+YvxoZ3P0EwnHmcOnoY0q67ImEFr6Y8t+a1SQrA516P58r6npsQCWm029+RFPFTodUi8+bpkFJ0cM35FuR906SngTJi26sA0EdTljBlC1GNHSIqCnHOjCvRfdwF0NaDBK5vssjFS7j/LZ98Hl31VF+ANKF1/KiEzqfmZH6yWwAkaZXP6aw3OTKRAKSYUlOLhSRbDH26wTr2fP6GsrVb4Fu/FUIRyPjZ1e0iMyje5AZdHpS8/wX826oKLOnMJnQdPQJ5w4cgq1+vevMIaI8v2rUPx9ZvxqHlq+F3uqOPIsBn+k3TQB1Q2oKS0QAQ4oTP7a4XyBBXACx2+4UK8D1DwSeNgb67miQZPFEI1+ffgbYF2/jRCLk9bZ4ZlJABQsC/bS+/N7mMa5IlKxOmjDTojHpQaa3KsjL4i53wFhbXGkvl7Wg+LBcMb9M+CEkJgKKU+Twec6O2ALPN9jsAfyZGk1NDNqkBIBUEMgtKRQD6vj2gtZiSEoCU3GwY8nsgdfRQzqBtExIC5bsPgFLJqFQ9HReTIlmGoVdXWEYOgmlof/bztwVR2rt3+Xr4t+xG5ZEC0OKMVyOITsY+l6ve40xcDWC2218Tirhd6LTIun1G1PVLH+75ZgkqDx6FZDbD2Ld7lQC8+Gi1vZDq3FK922okSYwudlw5vkXg0skyhgzZykMFXMCy8kQhFKeHmzORCpBSUtiRQ0geyvU39OjcYkGdpN5XCJQuXgXXnAW1GmyxAXpDdTd1wVMvq3WRhAj53O56pTW+AFitnwtIU2SrhWsAx1L5tt2gMDBpB/PQfvBvUuHVjIGPOT/TJHuXrUOw2InKw8dRvvdQFD1k6N0NmXff0CJomaQm9XQZJARKPpqH0qVr1TeWJBjze0DfqwtnH5sH94VU42RT8Ojf1YrhQgR8bncjNYDN9qUQuEy21waBhFylcH48lwXA2LsbKvaqjYsS4d8IulX84VxQBVGilgRMnC78TfSenm9/gPMzte4AbaPpt1zFf9dLhJN84CkukSMUxVfm8dRbhz++BnA4PoaizACng9VGtZS8N4ejb5QnEDyp9rJLxg1K+1bR65+gbNMOvib7nptg6Nsj0Tyckb9TvYOCx/7BoFdieocHboNEhmocouKRx55QEckC2FvmctXr005kAzwPIR5UBJD582trlXb1fr8K/p37QD4CDQQbJKkXDEfa9YmTIal0G4E5yajhMui/+ukZyeBEH00rnzQAqf2c398Vf+WHb+Zdupa1bHi7+LPP6aw3Xy6RAFCe1Zsc/p0+kQsnx1Lp96tQsWs/u4VTcjIZmUtFlaljSDJt4qKdrih/7rmHqtkOiSbmTPmdVjKtaNKQpCmTIY6I7jvMQ31arRVFRaX1XRdXAAx2e1cNcIAcPqbhA2AeXr38mWfRSlTuOQAKD1OlzMCBo/wcqmdPfvFEFNvYgFBGsiFx8CXRPX9sv0eqg5O3kXwPiaji0DGcePZVdZii+Hxx9n8aksgTCLPdvk4AQ2WzSe0BGHNJqNQL5wdfcB68NisdwudnlytlDnX84z0JVzSVZ6e69mcp8QwktaiEwIm/vYUKOmkRyfL9vpKSv8e7e0IBMDkcd0lC/IvUPNWl1/dQy8JEyPXZfAROFXO8hRw8vuXr+aekCiPQ8eaTrxjAcZbqnwFNqhkZN09P2LOgdMkaPi6qi1+p8Hs8CdOcEwoA8vKMZq93nxAiR061IO3aK6oZgxWHjqL0m6VsB1AJdf+mHdx8gYgSSUkQzlLLzwB5N0+99G60NK4sSVNLnc4vEj05sQAQqMJuv00CXidjkF2hg/tH70uOnpI3Z4JCpIb+vRkm5pr9tVqgWZJYYM4KQSI2NO338p1UFPvDqFtbkaTv/U7nxcncNSkBoN3EbLevFkIMExotMm6cAjmmCpd73kLODIpkDQVOFcEzdxEodz+yHdApItZDmMzLnR0Tfwbo2O1ZsByuLxZGK7WGQqFT5aWlBH9S24kkoGQFAAwMEWIZBYL0fbpHQ8N0f//G7fCu2sRBokjWEAvB10uipdrJMLRNHgvzuQOTOiImevEz+ndqHbNtD9yfL+S2MBFShCjxq6HfJCNcSZwCYifabLO9LyTpepI8xzWXQhfOwQsWlcA1+xt2C8dmDVFgpXTBD1GbgO5FfgLz4H4w5HdHSscsaOxWBpmc7TBej0gLwUWoFY+PQTjlew6ibP02UGm8WFJCoQP+0lKqR5c08+n6pDUADTampXWSQ6FdQsBIxz5ql8K3EALF73wKpayci0dW63ErBJyfzkeI4urNWIrtjNYANT5ekqTFXqeTmBFo6Lw0SABYCOz272TgElrtaq2AbvzM0gXLUb73IKQaWUO8Rezaj9KFKzgFi1A0oWJXtAZvQ1/47PiYGVAbQxLmj2L1DVr5kbs0SAAyMzMtXr//qKzV2vjgbzQg/YYpkLQ6lO/cB++S1XwcjM0aogcpZWUoevtTfiYDSwf3YxUWcnkg/OXho0tSNkuL8Z+CLUqpl2MTIbcXSl1AEUmCxmLiECxhBWSToclajVrY8TPpj9fHORdVilKq0tFCQEgSLyKytYhxTWV+g7cAk832Cwl4hTx/BIZkpPCQfowMpv3e+f4cdgtbzh8K06C+1ZhV/OEXCDk90OVkwjGNtFXbEk0iQdsqjh7nE0zgVEkUpxD7ZhqHFSl5OdwiLiU3i4W9KRTyelF55AR3AaU/6nE5zGdZVhmr0YCey0JRUan+GzFfp2PBZAER4gufx3NNY1d+ozSA2WZbLICLyCFEK4GMEpLKtGsnQ2u1wPnxPC7XzllDV6hZQxEiiDb3FJBlZN5+TZMnsuFMENwZtPLoce5YTmiZunoHErCCmkQyw/Ny+DubQlQ7qbLgJINhyGKnRUAcZNVLjA8vd22Gg+dNTjWjfM8hBKjpo6yueNI4pFlJIGRVGub6XC5ivtoNqwmU9BZA6r8sEHApiqIxDekPQ48uqsOHGkB3zYNt0oWMEOJCEVoNMu64ltVZhChI4Q63NCdsHWXgUlxbbc2a0yJdRBW/H5VHTzLDifGkbmuRRoauQxZSOnVgxusy0xpqG1e7JWuWwhJUkJDRn1PFahPn8CqnjCr6b8ofpO/WdeoAXcdsFgpqaFm+fW94xYNRPqbBfeHffZC3zDDz5/nUVrBNZn6DtgBCCAvge3b5Th4LfaeO8C5dw7h7+miKVtGKKp2/lCck656boE2zIVDk4j1eBAMofH1m1GERO2tkOJqG9OVtI9k+fnUJvRIK8somlU5qlmBodRF1OaH358nPyUrYAyD+AhO8MlmtHzmOioITQEWganWHVzuFx+lZpFlopdPxl4jmjuDqvjWbISor+ftp1Rv69YTxnD5wz1+GYJFTZT7wpc/tJmROszC/QQJgstl+LknSf0gACAtPjSKoSKPzw7m8L8kOG4M8S975lCU+2tCYVoTHy+q35KMvUXGw/sAPaQOKJ9TsPl4/AwTj3tQVfoK3JATVDh+xRPfj1d05B3pqBB1GNzdWcyoVFQgcO6nu40eOqw2q6lLrmWmcOkcMJ3Ap7e2xRFqpdNk6NobDqxu63Gy2oSSzEa4vFoF8LGHmf+1zOKbj4EG1YEEzUdJbgMnheJh60ZMAUA38yMf4N++Eb+UG1Qk0Zjgq9xxktUeSnvPQndXVYyDITNJlpEHS69heIKw+IV6ovTwRTViH39xWr9uYrinfsQ/+nftBjSGVcDHHahpFp2V8AgEnCUjB+Lkm+CBIg1UeOMLoJ/K7VxwqqNNgpG2NtkN951xmZE2gZuQdQ55SeH9Yz4uBjTtZgibVAhO1hO+ax3UJ3V8sRKAwzHxZ/sZns01rbuY3SANEOoSTAGT98oboPkleQdesrxByuiFSUmAa0CtaNTT3yQegdVQvK1uX4BI2v+i/n3KpNyLLmOFID9fYJyvZv+dglOmRSGPN+3DOQd+eMOR3g6GnamM0moRA4GQxynfsZaZX7D7IxahrElk4khDQOGxcL0GXoFUcGYS+ddsYCymxq16CrNPCOLQ/jOfkcwfSOpg/32ezXdkSzG+QAFCVMEjSM6wBbv+J6r4NE6lBz1eL+QhIjqHKMCDBftlFbC8kQxRVPElgBmqLLknsTaTW7hUHj9VpN9A5nFY3r/L87k0uxqCU+uDfdYD9GWTXUP/B+ogQUkSyzQLL6OHQJ+wRKFhj+VZt4m2TrXsA+l7dYD5vULT5tKgMwDV3AR9JSe0LSfq2zGK5EkeP1l++JJnJjTMm6S3AbLdThcS363L00P1JAMjyJf9QSlYaW8K09+Y+/mvI5vj9e2IFiZo+1kW0oun0QJlFxn491HK1TVLrQVTsPaxuJTv38V5eF/ExUKtFsMTNJx51n9LBMvwcNtISGa205dE+H93LyRualQHTqCH8d4SY+RRVPVkcYf53ZRbL1JZkfoM0gMlqPVeS5dUkANwzoG/10iucJzDzS7b4NZkOKOFghWX00FpJJfGElgQgwgyyI4x91RVOe3qT0rGE4PM42Q/lOw9wUCUSro59H3K20Haiy+2AUFkZyrbsrkofo4SMvj24/k8iQzXkK4NvxQZ+TmSflw16mM8fqjbbihFe2hoopEu2E618RZIW+E2mqSgoUKtVtyAlrQFIY5ltNic5gFO65HFjxJpEH+zfvIMNQor0RfbrzNuugWlYcsUZKJO38sBRGAgkmlpvTmNSU0JqnA03YvquA9F2stUuliTGM7Lzh6z1zDRUHDsB7w/rVKdNmMiDScmgZMDGI9rKfBu3w79+O0QoWHWs69sDlvOGADVsE2b+3KqVr0jSQr/JNKU1mN8gDUCDLVbrHEWWp5L9QnH/mquALHTXJ1+yqiQQKRlIvOdptcj61Y3RwFFS3GvEIDLUCBBJezip9cBxNVmlJsm2VHWVk4u3Y3bUnqEsZ0q8ZLsjTLQF0LFM35Myo+OtF8H2i3f5Bvbps+OH/ocaUFx2ET+nJpFvhI56VNdIliQoEhb5TabJrcX8hguA3X6VAGaREWQMxwBiP4qYXfzuZyrjaUz/XqjcfYAjf+QIIWBjspogKf4rCiqOnODjIHnQKg4ciWLiYq+nRE86lrEvIK8DH7liSbXOt3K2cKQHMnkzKc5Bf2RN/BNF0OmCd8UGBMkGCnv62BjSp8Bx1SRorNxYvfozazN/sV+vn4yTJ31JfXszDWrIFkCP1Jrs9p0S0IM+lEqi1Pw48mG75y1SDSaS/nEj4V28KsoYyhegnoOkIRpD5C8o37GfQ8y0yut078pyWK2T1y1bBa7UaTDGWOcxdQJpj6b3JGdXnUSuXKMesiyjdPl6tu6Z4WHiYBk1n542oX7mz12EwAm1SqkEscRnMFze2sxvsAagCyw22wwhSR/TB2uy0mG/ckItS7h86y5WpXws7NWN89c985dC8ak2DcUArBeNgGX0MGgTtGtjP8DuA6ofYNd+zpKpi8i1qq7yHPatJ/IDkNql2AX76sNE+3/qBQyfnkoAAA1OSURBVMM4NlCTyHGltZghp5qY+b4f1sNJgu4Pe2XDYVrSjnTqIa+oxla9swrdk9V+LPOFstSk119eWFio9rtvZWqoBmD+me126qXKBSOJwdZLqHRM9Vu55y5kq5vhY1dPgtZmVa3icC29yHeSpU8NlehYx0cuWebQMqWZkUpnr1u4lGvs3BDAlNS56mrtUP9qrTGhbJ2vpPdQs5lVgTTAct4gGPO7V/VD1MrcL1hDDE81RzuLkn3hnPk179sRomhdgAxGsn1MYebXaKtDYwnaRdqRbBO2D4SyzKzXX9ZWzG+UBqCLUlNTMxRgrdBouhCDKXBBK7p61pAPro/mggorabPSeC+k38k/4N+wDRQdjFWbiQSfztvaDhmq4ZbbARQ+bYgfgOwQ2uPL1m2tOv7JMkwD+8A87BxIhhRozAYWJGI4t4aJ2TZI85TM/hqRVC16X6qbQILr3xHuQJ6I+V8uRrDgFDuCBPCDSau9rChO3l6iOWmO3xujAfi51EYmEAot0QAZLAR9e4QbSlbdsmztZgYwcpxg3EgYY1rNUAoZa4S9h9R5ZpBD1SeRH53VemaaynRy/DTKvRu2zldsqHYMTOnSEbaxI7n6B2XeaMhZJVd1Q428Cal419dLULpoZRWMTaeFeUh/KBDwrdjIQ+Ou/FCQk2coYsgLH1hu0movbWvmN1oDRCbH7HCcExRiYVQI8rurQhBuK0uOFooWktqVDAak36jCx6IkFJR88jWHbWnPppJzFBomq5384k2lABV5+mE9gytUXS9Bm26HY8o4mKnOTzyBUhSuI+T6fAHXQIiQoU93mM4dhPJ9B7nySYT59ivH1+qmxj9qZLWcDrm41djBihSN5tKSkpIqJ0NTP7QJ1zdaA0SeaXE4BgRUIchkTcA5A1VCQOfy0oXLq8HHYt+X7ATXnO/4nyiOYL1kVBM+R72UwrXe1ZtRvm1PFIgBgwGOyRcj9cIRCfMSKLWachZj3cO6rHSYRw3j00XZll1sQMZlvkaG1pEK16xvotVQJCFWpmg0k9oL85usAaJCkJbWP6AoJARZqhBQTcGRUU0QKSxJ8DGK8tU8OrrnL43ms5OtQLgA8o0HS1XDmOBm5KJNREIoqNhzgNUyY+fCqz511FDYpoxjVR+PCLNAEHayEyJEqt08cojqvqUaibHMNxpgn0Yrv3rEU+uwQpfhQOHrH3P4WF360qoUYJLTGVNoMNEHtcLvTdYAMULQLywE2SwEtJrHqUJAhp/r029U+FgdbmQCSha/PxcIhRgMKev1qpUdc7bWZqar0b++PaodO8l4ozJ1dKZmCzvGOqf4QdqMyxibEI+o2QRhEjzzl0VxgoR3MA7MV0vih7eKMiqMtWSNyk8655Pajwl3y2YDexhlrRanXvmAj65hWp0iSRPbG/ObTQNEhUA1DBdpAFUIenVF6rjzmWFqOZn9Knxsyjg+r8eSb+1mUEm5REQTTgkpVLaNjo3k73fOno+yzWqVMiJagZSLSPX84p4UKMVq/TY4P/2WwSkRSunemcO0sR5D/7bdoPTrupjPQJCcDBYGgsUVvvIh/Dv2Rm63RgdMdLlc1VN5En1oK/3ebBog8r6p6en5SjC4SEhSB1UIuiB13CiOqFF/QZogMsSorp2oDEYtf8LzOd+fy350OoqldO+kGlXkVi71clSNytTzgUGfgqy7rucVRi3jKALJjNFpYZ04BtYJoxKWnqP9nWsThEupsOCk2Xmf13Ws7ggizF7pktVh5uvDK98OCt3pMuwc1iWjlYxeZv72KPPX6oAJ7ZX5za4BokKQmtpH0WgWCSCHhIDTxS4ZhXKCj63exMNINVvGnMsIGK7WGQwi6PayCmdEjyGFnS+yXs0bpECPe95ieL77oc61QTEGcjEnQiCRRU9wK3LhRrYYRt+eO1DthFbjKEhJmJTwoq58PRxTx7OgaGwWroskh2si1sH8dVohJrjd7rqRqa20whM9ptk1QIwQ9FYkaZGQ5Y4RISAcgWvW19xllMEij92XsOpFzQ/wfLsMzs/UUwMR7e8kTLTfxyPSEtRDwPXl4mjGMgkW1TQwDxtQJwaxbPseeL8PM9+gZ+SzPjeLI3uxBiWr/f9UW/nrtUKMb+/MbzENEGGE1WrtFQIWxwoBbQml85fxEMvIwYwwbhAJgcI3ZvKW4Jh6Cd+jLgdO7D1JhZfM+rpaHIFsEPOooVF4ds13oD2cSrPyJBn0rF3M/XtCS42yqoE5gqDWtTGVyDdoFGW8x+MpadB3tdHgFtMA1YSANIEk5bImoJUaDEZbzTYELNLQOSJASsmsb6qViScsAMX3yQNYH/l37kXpoirmZ940DaZB+bX8B7zyX/so1j28UaMol5wuzG9xDRAjBD1DQiwSGk0eCQFNPqWL01mfwCLZ994UPWc3lMl1jSdcgvur73kF0/P4Q3VamIYOgGFA77hZSIQg4pVPgR2jAdkEZAn7AGKfRVtK0WsfMWSMKRTaRFnTpaWldYcrm+PDWuAeLa4BIu9ss9l6BEkIZLkTMYWyZLhmAE20Tof0O2bANKB30z5RUVC6YgPj6wjlG6GI+5azeeMQp7EvWskjNCYjOtx/S50+BJX5H7NTiEgJhTZrVeZXhQib9iWtdnWrCQB9kcFm664JhRYJrbYzC0E21QrgitZRKLj9iosTxvLrmh1yObP7NtzFnMZQTwILuW853y8++XdTDYOVvL0T87N/HYf5VOc47HdQhNiiVZRxpyPzW20LiJ16g83WTaMotB1wKJmFwOVhu4CZlmaH9dIxsIwYlJQgEMPdXy/hVnERIrSReeTgWjUN6xMBwijQnk9BWnL9Zt93c502AoWUi16fGS1yTczXhEKXeL3eusGHiaSuHfzeqhogqpKpBG0otDgiBPrcbPYQEggkQnw2H9Cba+Kn5GSpiR+UOeOv4GTJysPH2PiKXfHkjDEO6gcj1c9PsqMHNb1wf7uMcYx0zs++9xbou9Q2EJn5b8yMZi+FhNiqDYXGnc7MbxMNECMEXTR0RAS6smHYpSM7gPwbt4FyDBpC5GrW9+4G49ABSefzE0g1eKoIzlnfqOnbBj2vfH2X3FqPZua/OSuqZUKKso3UvtfrPdWQ92yPY9tEA0QmwuhwdJaFICHoFhECKohM6JvK/Yd5dXPmbR1EwRpCCBHDUrp3Ucu1JEMSGNsfOFqAov9+VsX8e2+Gvmti5gtguxwMjv0xML9NNUCsEGiEWKQA3QlQSZ4922UXcktaIsqZp5o9BBrxrtwAUV7JTONaQ8POSYbl0TEaq5m9eFSphPsY0crXpyCbmN+tdus3bmzx1iwOGPG7CLFDCgbH+ny+2m3HGvQm7Wdwm2qAqBCkpXWSFGURCG5ehxBExlHihnPOd1EoOPnvKUePmaMoao0AKsPi9qrHS7ORMXsE9kzpmgttqplj/YVvxjCf1H4dff+Y+W/PjmIDFCF2yikpY32FhVWVGdsPHxv9Ju1CAOjtjWlpeWEh6MlCkBfWBDWKKlBuPSGI1O5egPnccxiQQYkZXGUrliSJc+0kkwH2SWOgcdiZqYQyTrjyY5kvSbskjWZsWVFR3RmkjZ7+tr+w3QgAC0F6eq5MfgKgFwkBJXVwxZAamTk1hSB2GmnVk79eTtFBcXs4q7cmMfPvuQn67p1q/UYrv/i/s+FbG0UF7RZa7cU/Rua3CxugJgfCQrBQAL1ZCHKzYbu8thBQ2Rk3awJ11VPdH+pXZOqrpo5T8gZtAwQ/J8BIJO5PgpFFe34dzCfNQPUMfWujwBRiPq38grZfqy3zBu1KA0Q+0ZSR0VGEQgslIfrEEwLqWEL4AIJ0p197BZ8KCENQi6jT6ez5jM9Lv35y3aFjYv47n8G3enPk8j3hlf+jZX671AAxQpAjAoGFkiTl08qkAJJ92gQGiEgaLaQULQdr6PhXJ9MbsmCY+XOiYBVqtSY0mov9xcVVacINud9pNLZdaoDI/JkzMzsolZWLZBICiiX06orMu2/k/b3ZiJj/7hw1wVPNTdknZPlif0nJGdHHpl0LAFv5ZnO20OkWSkA/+v8EL8u++8bmaT6hKCh+73NOAAmrw/0hlflqFscZQO1eACJCENJoFmhkmXvV0HZApeoI/dtY4spkb38aDexIwBnH/HZtA9RkrMViyQpJ0reyRsPNCzkX7+pJnNXbkCRRupYaLBV/MDcafGK1L0nj/E6n2m3xDKLTQgNE+OFwOGyVivI+JOnyyL9RIgblHpiH9Iu7LRCIg7J4qdtpTMIGJ2rKweD0H4tvv6Gye1oJQPjjZIvdfo9QlKchy9FcLwoOkbuXysDQ1kBJpoTZo8SRwPFTKN93uKral3qjgAQ87XW5nmpMp42GTnR7HX86CgDPpSkjI0cKBh+CotweKwhJTHQQivK+VpKecLvd0dytJK77UQ45bQUgwo20tDRrhaJMgyRdgWBwFDSaWmE9BSiSgVWSJH2FQOCTM1Xd1yXBp70A1Pwo6mtQUVGRE9JojHIwWCHL8im32015eW3bk6ad6o8fnQC003lut691VgDaLWta58X+P77sn9oK/TZvAAAAAElFTkSuQmCC"
class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };

    //this.onKeyPress = this.onKeyPress.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)

  }

  onUsernameChange(username) {
    //console.log("username: ", username )
      this.setState({username})
  }


  render() {
    return (
        <View style={styles.toppad}>
      <Image
        style={styles.logo}
        resizeMode={Image.resizeMode.contain}
        source={{uri: logo}}
      />
      <View><Text style={styles.brand}>MONEYS</Text></View>

                <Animatable.View>
          <View style={loginstyles.formbox}>
            <View style={loginstyles.textinputview} >
              <TextInput style={loginstyles.textinput} placeholder="Username" value={this.state.username} onChangeText={this.onUsernameChange} placeholderTextColor='gray'/>
            </View>
            <View style={loginstyles.textinputview} >

              <TextInput style={loginstyles.textinput} secureTextEntry={true} placeholder="Password" placeholderTextColor='gray'/>
            </View>
            <TouchableOpacity style={loginstyles.button}>
        <Button
      style={loginstyles.buttontext}
        onPress={() => {

          if (this.state.username == '') {
            AlertIOS.alert("Please enter a username")
          } else {
            let route = YourRouter.getMainRoute();
            //this.props.navigator.push(route);
           this.props.navigator.replace({id: this.state.username});
          }


        }}>
          Login
        </Button>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        </View>

    );

  }
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
  },
  brand: {
    margin: 50,
    textAlign: 'center',
    fontSize:40,
    textShadowColor: "#f0f8ff",
    textShadowRadius: 20,
    fontFamily: 'Helvetica',
    fontWeight: '500'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toppad: {
    marginTop: 100,
  }
});

var loginstyles = StyleSheet.create({
  bottomhalf: {
    flex: 5,
    flexDirection: 'column',
    marginBottom: 60
  },

  formbox: {
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  button: {
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'green'
  },
  buttontext: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  textinputview: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },

  textinput: {
    flex:10,
    height: 40,
    color: 'black',
    paddingLeft: 20,
    fontSize: 12
  },

  icon: {
    height: 20,
    width: 20,
    margin: 10,
  }
});

module.exports = LoginPage;
